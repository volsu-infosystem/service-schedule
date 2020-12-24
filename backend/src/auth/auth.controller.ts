import { Body, Post, UseGuards } from '@nestjs/common';
import { Controller } from '@nestjs/common/decorators/core/controller.decorator';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dto/login-user.dto';
import { RegisterUserDto } from './dto/register-user.dto';
import { RegisterResponse } from './interfaces/registerResponse.interface';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('request')
  async requestSecretCode(
    @Body() registerUserDto: RegisterUserDto,
  ): Promise<RegisterResponse> {
    return await this.authService.registerNewDevice(registerUserDto);
  }

  @Post('login')
  async login(@Body() loginUserDto: LoginUserDto): Promise<any> {
    return this.authService.createToken(loginUserDto);
  }
}
