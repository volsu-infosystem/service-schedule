import { Body, Controller, Delete, Get, Param, Put, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './entities/user.entity';
import { UserService } from './user.service';

@Controller('user')
@UseGuards(JwtAuthGuard)
export class UserController {
    constructor(
        private readonly userService: UserService,
    ) {}

    @Get()
    async findAll(): Promise<UserEntity[]> {
        return await this.userService.findAll()
    }

    @Get(':id')
    async findOneById(@Param('id') userId: number): Promise<UserEntity> {
        return await this.userService.findOneById(userId)
    }

    @Put(':id')
    async update(@Param('id') userId: number, @Body() updateUserDto: UpdateUserDto): Promise<UserEntity> {
        return await this.userService.updateOne(userId, updateUserDto);
    }

    @Delete(':id')
    async remove(@Param('id') userId: number): Promise<UserEntity[]> {
        return await this.userService.deleteOne(userId);
    }
}

