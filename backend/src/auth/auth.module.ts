import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ProfileModule } from 'src/profile/profile.module';
import { UserModule } from 'src/user/user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { SecretCodeService } from './secretCode.service';

@Module({
  imports: [
    UserModule,
    ProfileModule,
    PassportModule.register({
      defaultStrategy: 'jwt',
      property: 'user',
      session: false,
    }),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: process.env.JWT_EXPIRES_IN}
    })],
  controllers: [AuthController],
  providers: [AuthService, SecretCodeService]
})
export class AuthModule {}
