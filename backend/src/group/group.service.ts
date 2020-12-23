import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeepPartial } from 'typeorm';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import { GroupEntity } from './entities/group.entity';
import { GroupNotFoundException } from './exceptions/group.exceptions';

@Injectable()
export class GroupService {
  constructor(
    @InjectRepository(GroupEntity)
    private readonly groupRepository: Repository<GroupEntity>,
  ) {}

  async create(group: CreateGroupDto): Promise<GroupEntity> {
    const newGroup = this.groupRepository.create(group);
    return await this.groupRepository.save(newGroup);
  }

  async findAll(): Promise<GroupEntity[]> {
    return await this.groupRepository.find();
  }

  async findOneById(groupId: number): Promise<GroupEntity> {
    return await this.groupRepository.findOne({ id: groupId });
  }

  async updateOne(
    groupId: number,
    updateGroup: DeepPartial<UpdateGroupDto>,
  ): Promise<GroupEntity> {
    await this.groupRepository.update({ id: groupId }, updateGroup);
    const updatedGroup = await this.groupRepository.findOne(groupId);
    if (updatedGroup) {
      return updatedGroup;
    }
    throw new GroupNotFoundException(groupId);
  }

  async deleteOne(groupId: number): Promise<GroupEntity[]> {
    const groupToRemove = await this.groupRepository.find({ id: groupId });
    return await this.groupRepository.remove(groupToRemove);
  }
}
