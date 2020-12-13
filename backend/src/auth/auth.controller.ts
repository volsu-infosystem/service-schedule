import { Body, Post } from "@nestjs/common";
import { Controller } from "@nestjs/common/decorators/core/controller.decorator";
import { AuthService } from "./auth.service";
import { RegisterUserDto } from "./dto/register-user.dto";
import { AuthResponse } from "./interfaces/authResponse.interface";
import { RegisterResponse } from "./interfaces/registerResponse.interface";

@Controller('auth')
export class AuthController {
    // @Post()
    // async auth(@Body() ): Promise<AuthResponse> { 
    // return await 
    // }

    constructor(
        private readonly authService: AuthService
    ) {}

    @Post()
    async register(@Body() registerUserDto: RegisterUserDto): Promise<RegisterResponse> {
        return await this.authService.register(registerUserDto)
    } 


}
