import { Injectable } from '@nestjs/common';
import { ProfileService } from 'src/profile/profile.service';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { RoleService } from 'src/user/role.service';
import { UserService } from 'src/user/user.service';
import { RegisterUserDto } from './dto/register-user.dto';
import { RegisterResponse } from './interfaces/registerResponse.interface';
import { SecretCodeService } from './secretCode.service';

@Injectable()
export class AuthService {

    constructor(
        private readonly userService: UserService,
        private readonly profileService: ProfileService,
        private readonly secretCodeService: SecretCodeService,
        private readonly roleService: RoleService
    ) {}

    async register(user: RegisterUserDto): Promise<RegisterResponse> {

        let currUser = await this.userService.findOneByEmail(user.email)
        
        if (currUser) {
            const newSecret = await this.secretCodeService.generateSecretCode() 
            currUser = await this.userService.changeSecret(currUser.id, newSecret)
        } else {
            const newUserDto: CreateUserDto = {
                email: user.email,
                secretCode: await this.secretCodeService.generateSecretCode(),
                profile: await this.profileService.findOneByEmail(user.email),
                role: await this.roleService.getRoleByName('user')
            };
            currUser = await this.userService.create(newUserDto)
        }
        const res = {
            status: 200,
            user: currUser
        }
        return res;
    }

}
