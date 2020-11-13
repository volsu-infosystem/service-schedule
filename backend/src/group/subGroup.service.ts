import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository, DeepPartial } from "typeorm";
import { CreateSubGroupDto } from "./dto/create-sub-group.dto";
import { UpdateSubGroupDto } from "./dto/update-sub-group.dto";
import { SubGroup } from "./entities/subGroup.entity";
import { SubGroupNotFoundException } from "./exceptions/subGroup.exceptions";

@Injectable()
export class SubGroupService {
    constructor(
        @InjectRepository(SubGroup)
        private readonly subgroupRepository: Repository<SubGroup>
    ) {}

    async create(subgroup: CreateSubGroupDto): Promise<SubGroup> {
        const newSubGroup = this.subgroupRepository.create(subgroup)
        return await this.subgroupRepository.save(newSubGroup)
    }

    async findAll(): Promise<SubGroup[]> {
        return await this.subgroupRepository.find();
    }

    async findOneById(subgroupId: number): Promise<SubGroup> {
        return await this.subgroupRepository.findOne({id: subgroupId})
    }

    async updateOne(subgroupId: number, updateSubGroup: DeepPartial<UpdateSubGroupDto>): Promise<SubGroup> {
        await this.subgroupRepository.update({id: subgroupId}, updateSubGroup);
        const updatedSubGroup = await this.subgroupRepository.findOne(subgroupId);
        if (updatedSubGroup) {
            return updatedSubGroup
        } 
        throw new SubGroupNotFoundException(subgroupId);
    }

    async deleteOne(subgroupId: number): Promise<SubGroup[]> {
        const subgroupToRemove = await this.subgroupRepository.find({id: subgroupId});
        return await this.subgroupRepository.remove(subgroupToRemove);
    }
}
