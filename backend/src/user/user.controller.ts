import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './entities/user.entity';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(
        private readonly userService: UserService,
    ) {}

    @Post()
    async create(@Body() createUserDto: CreateUserDto): Promise<UserEntity> {
        console.log(createUserDto)
        return await this.userService.create(createUserDto)
    }

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

