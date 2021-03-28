import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { MailService } from 'src/mail/mail.service';
import { ProfileService } from 'src/profile/profile.service';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { RoleService } from 'src/user/role.service';
import { UserService } from 'src/user/user.service';
import { EmailIsNotVolsuException } from './auth.exceptions';
import { LoginUserDto } from './dto/login-user.dto';
import { RegisterUserDto } from './dto/register-user.dto';
import { EmailObject } from './interfaces/authEmail.interface';
import { RegisterResponse } from './interfaces/registerResponse.interface';
import { SecretCodeService } from './secretCode.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly profileService: ProfileService,
    private readonly secretCodeService: SecretCodeService,
    private readonly roleService: RoleService,
    private readonly mailService: MailService,
    private readonly jwtService: JwtService,
  ) {}

  async registerNewDevice(user: RegisterUserDto): Promise<RegisterResponse> {
    let currUser = await this.userService.findOneByEmail(user.email);
    const transformedEmail = await this.transformEmail(user.email);

    if (currUser) {
      const newSecret = await this.secretCodeService.generateSecretCode();
      currUser = await this.userService.changeSecret(currUser.id, newSecret);
    } else {
      const newUserDto: CreateUserDto = {
        email: user.email,
        secretCode: await this.secretCodeService.generateSecretCode(),
        profile: await this.profileService.provideProfile(
          transformedEmail,
          user.email,
        ),
        role: await this.roleService.getRoleByName('user'),
      };

      currUser = await this.userService.create(newUserDto);
      await this.profileService.linkStudentToUser(currUser, newUserDto.email);
    }

    await this.mailService.sendSecretCode(currUser.email, currUser.secretCode);

    const res = {
      status: 200,
    };
    return res;
  }

  private async transformEmail(email: string): Promise<EmailObject> {
    const addressAndDomainSplit = email.split('@');
    const emailDomain = addressAndDomainSplit[1];

    if (emailDomain !== 'volsu.ru') {
      throw new EmailIsNotVolsuException(email);
    }

    const groupAndTicketSplit = addressAndDomainSplit[0].split('_');
    const group = groupAndTicketSplit[0];
    const ticketNumber = groupAndTicketSplit[1];

    return {
      ticketNumber,
      group,
      emailDomain,
    };
  }

  async validateUser(email: string, secret: number): Promise<any> {
    const user = await this.userService.findOneByEmail(email);

    if (user && user.secretCode === secret) {
      return user;
    }

    return null;
  }

  async createToken(user: LoginUserDto): Promise<any> {
    const currUser = await this.userService.findOneByEmail(user.email);
    const currUserProfile = await this.profileService.findOneByEmail(
      user.email,
    );

    if (currUser) {
      const userPayload = {
        user: currUser.id,
        role: currUser.role,
        profile: currUserProfile,
      };

      return {
        access_token: this.jwtService.sign({
          userPayload,
        }),
      };
    }

    return null;
  }
}
