import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeepPartial } from 'typeorm';
import { CreateSubGroupDto } from './dto/create-sub-group.dto';
import { UpdateSubGroupDto } from './dto/update-sub-group.dto';
import { SubGroupEntity } from './entities/subGroup.entity';
import { SubGroupNotFoundException } from './exceptions/subGroup.exceptions';

@Injectable()
export class SubGroupService {
  constructor(
    @InjectRepository(SubGroupEntity)
    private readonly subgroupRepository: Repository<SubGroupEntity>,
  ) {}

  async create(subgroup: CreateSubGroupDto): Promise<SubGroupEntity> {
    const newSubGroup = this.subgroupRepository.create(subgroup);
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
    await this.subgroupRepository.update({ id: subgroupId }, updateSubGroup);
    const updatedSubGroup = await this.subgroupRepository.findOne(subgroupId);
    if (updatedSubGroup) {
      return updatedSubGroup;
    }
    throw new SubGroupNotFoundException(subgroupId);
  }

  async deleteOne(subgroupId: number): Promise<SubGroupEntity[]> {
    const subgroupToRemove = await this.subgroupRepository.find({
      id: subgroupId,
    });
    return await this.subgroupRepository.remove(subgroupToRemove);
  }
}
