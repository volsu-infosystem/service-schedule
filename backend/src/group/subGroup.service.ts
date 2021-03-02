import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeepPartial } from 'typeorm';
import { CreateSubGroupDto } from './dto/create-sub-group.dto';
import { UpdateSubGroupDto } from './dto/update-sub-group.dto';
import { GroupEntity } from './entities/group.entity';
import { SubGroupEntity } from './entities/subGroup.entity';

@Injectable()
export class SubGroupService {
  constructor(
    @InjectRepository(SubGroupEntity)
    private readonly subgroupRepository: Repository<SubGroupEntity>,
  ) {}

  async create(subGroup: CreateSubGroupDto): Promise<SubGroupEntity> {
    const newSubGroup = this.subgroupRepository.create(subGroup);
    newSubGroup.group = {
      id: subGroup.groupId,
    } as GroupEntity;
    return await this.subgroupRepository.save(newSubGroup);
  }

  async findAll(): Promise<SubGroupEntity[]> {
    return await this.subgroupRepository.find();
  }

  async findOneById(subgroupId: number): Promise<SubGroupEntity> {
    return await this.subgroupRepository.findOne({ id: subgroupId });
  }

  async updateOne(
    subgroupId: number,
    updateSubGroup: DeepPartial<UpdateSubGroupDto>,
  ): Promise<SubGroupEntity> {
    const newSubGroup = this.subgroupRepository.create(updateSubGroup);
    if (updateSubGroup.groupId)
      newSubGroup.group = { id: updateSubGroup.groupId } as GroupEntity;

    await this.subgroupRepository.update({ id: subgroupId }, newSubGroup);

    const updatedSubGroup = await this.subgroupRepository.findOne(subgroupId);

    if (updatedSubGroup) {
      return updatedSubGroup;
    }
    throw new HttpException('Not found', HttpStatus.NOT_FOUND);
  }

  async deleteOne(subgroupId: number): Promise<SubGroupEntity[]> {
    const subgroupToRemove = await this.subgroupRepository.find({
      id: subgroupId,
    });
    return await this.subgroupRepository.remove(subgroupToRemove);
  }
}
