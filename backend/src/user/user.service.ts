import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository, DeepPartial } from "typeorm";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { UserEntity } from "./entities/user.entity";
import { UserNotFoundException } from "./exceptions/user.exceptions";

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>
    ) {}

    async create(user: CreateUserDto): Promise<UserEntity> {
        const newUser = this.userRepository.create(user)
        return await this.userRepository.save(newUser)
    }

    async findAll(): Promise<UserEntity[]> {
        return await this.userRepository.find();
    }

    async findOneById(userId: number): Promise<UserEntity> {
        return await this.userRepository.findOne({id: userId})
    }

    async updateOne(userId: number, updateUser: DeepPartial<UpdateUserDto>): Promise<UserEntity> {
        await this.userRepository.update({id: userId}, updateUser);
        const updatedUser = await this.userRepository.findOne(userId);
        if (updatedUser) {
            return updatedUser
        } 
        throw new UserNotFoundException(userId);
    }

    async deleteOne(userId: number): Promise<UserEntity[]> {
        const userToRemove = await this.userRepository.find({id: userId});
        return await this.userRepository.remove(userToRemove);
    }
}