import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, Repository } from 'typeorm';
import { CreateInstituteDto } from './dto/create-institute.dto';
import { UpdateInstituteDto } from './dto/update-institute.dto';
import { Institute } from './entities/institute.entity';
import { InstituteNotFoundException } from './exceptions/institute.exceptions';

@Injectable()
export class InstituteService {
    constructor(
        @InjectRepository(Institute)
        private readonly instituteRepository: Repository<Institute>
    ) {}

    async create(institute: CreateInstituteDto): Promise<Institute> {
        const newInstitute = this.instituteRepository.create(institute)
        return await this.instituteRepository.save(newInstitute)
    }

    async findAll(): Promise<Institute[]> {
        return await this.instituteRepository.find();
    }

    async findOneById(instituteId: number): Promise<Institute> {
        return await this.instituteRepository.findOne({id: instituteId})
    }

    async updateOne(instituteId: number, updateInstitute: DeepPartial<UpdateInstituteDto>): Promise<Institute> {
        await this.instituteRepository.update({id: instituteId}, updateInstitute);
        const updatedInstitute = await this.instituteRepository.findOne(instituteId);
        if (updatedInstitute) {
            return updatedInstitute
        } 
        throw new InstituteNotFoundException(instituteId);
    }

    async deleteOne(instituteId: number): Promise<Institute[]> {
        const instituteToRemove = await this.instituteRepository.find({id: instituteId});
        return await this.instituteRepository.remove(instituteToRemove);
    }
}
