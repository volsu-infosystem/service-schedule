import { RegisterUserDto } from "src/auth/dto/register-user.dto";
import { DeepPartial, EntityRepository, Repository } from "typeorm";
import { UpdateUserDto } from "./dto/update-user.dto";
import { UserEntity } from "./entities/user.entity";
import { UserNotFoundException } from "./exceptions/user.exceptions";

@EntityRepository(UserEntity)
export class UserRepository extends Repository<UserEntity> {

    async findAll(): Promise<UserEntity[]> {
        return await this.find();
    }

    async findOneById(userId: number): Promise<UserEntity> {
        return await this.findOne({id: userId})
    }

    async findOneByEmail(userEmail: string): Promise<UserEntity> {
        return await this.findOne({ where: { email: userEmail}})
    }

    async updateOne(userId: number, updateUser: DeepPartial<UpdateUserDto>): Promise<UserEntity> {
        await this.update({id: userId}, updateUser);
        const updatedUser = await this.findOne(userId);
        if (updatedUser) {
            return updatedUser
        } 
        throw new UserNotFoundException(userId);
    }

    async deleteOne(userId: number): Promise<UserEntity[]> {
        const userToRemove = await this.find({id: userId});
        return await this.remove(userToRemove);
    }

}