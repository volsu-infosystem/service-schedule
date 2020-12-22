import { Injectable } from "@nestjs/common";
import { DeepPartial } from "typeorm";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { UserEntity } from "./entities/user.entity";
import { UserNotFoundException } from "./exceptions/user.exceptions";
import { UserRepository } from "./user.repository";

@Injectable()
export class UserService {
    constructor(
        private readonly userRepository: UserRepository,
    ) {}

    async create(user: CreateUserDto): Promise<UserEntity> {
        const newUser = this.userRepository.create(user)
        return await this.userRepository.save(newUser)
    }

    async findAll(): Promise<UserEntity[]> {
        return await this.userRepository.findAll();
    }

    async findOneById(userId: number): Promise<UserEntity> {
        return await this.userRepository.findOne({id: userId})
    }

    async findOneByEmail(email: string): Promise<UserEntity> {
        return await this.userRepository.findOneByEmail(email)
    }

    async changeSecret(userId: number, newSecret: number): Promise<UserEntity> {
        await this.userRepository.update({id: userId}, {secretCode: newSecret})
        const updatedUser = await this.userRepository.findOne(userId)
        if (updatedUser) {
            return updatedUser
        }
        throw new UserNotFoundException(userId)
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