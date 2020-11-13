import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeepPartial } from 'typeorm';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import { Group } from './entities/group.entity';
import { GroupNotFoundException } from './exceptions/group.exceptions';

@Injectable()
export class GroupService {
    constructor(
        @InjectRepository(Group)
        private readonly groupRepository: Repository<Group>
    ) {}

    async create(group: CreateGroupDto): Promise<Group> {
        const newGroup = this.groupRepository.create(group)
        return await this.groupRepository.save(newGroup)
    }

    async findAll(): Promise<Group[]> {
        return await this.groupRepository.find();
    }

    async findOneById(groupId: number): Promise<Group> {
        return await this.groupRepository.findOne({id: groupId})
    }

    async updateOne(groupId: number, updateGroup: DeepPartial<UpdateGroupDto>): Promise<Group> {
        await this.groupRepository.update({id: groupId}, updateGroup);
        const updatedGroup = await this.groupRepository.findOne(groupId);
        if (updatedGroup) {
            return updatedGroup
        } 
        throw new GroupNotFoundException(groupId);
    }

    async deleteOne(groupId: number): Promise<Group[]> {
        const groupToRemove = await this.groupRepository.find({id: groupId});
        return await this.groupRepository.remove(groupToRemove);
    }
}
