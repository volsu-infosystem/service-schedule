import { Strategy } from 'passport-local';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { AuthService } from './auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({ usernameField: 'email', passwordField: 'secretCode' });
  }

  async validate(email: string, code: number): Promise<any> {
    const user = await this.authService.validateUser(email, code);

    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
