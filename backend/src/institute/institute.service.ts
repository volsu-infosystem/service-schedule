import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, Repository } from 'typeorm';
import { CreateInstituteDto } from './dto/create-institute.dto';
import { UpdateInstituteDto } from './dto/update-institute.dto';
import { InstituteEntity } from './entities/institute.entity';
import { InstituteNotFoundException } from './exceptions/institute.exceptions';

@Injectable()
export class InstituteService {
  constructor(
    @InjectRepository(InstituteEntity)
    private readonly instituteRepository: Repository<InstituteEntity>,
  ) {}

  async create(institute: CreateInstituteDto): Promise<InstituteEntity> {
    const newInstitute = this.instituteRepository.create(institute);
    return await this.instituteRepository.save(newInstitute);
  }

  async findAll(): Promise<InstituteEntity[]> {
    return await this.instituteRepository.find();
  }

  async findOneById(instituteId: number): Promise<InstituteEntity> {
    return await this.instituteRepository.findOne({ id: instituteId });
  }

  async updateOne(
    instituteId: number,
    updateInstitute: DeepPartial<UpdateInstituteDto>,
  ): Promise<InstituteEntity> {
    await this.instituteRepository.update({ id: instituteId }, updateInstitute);
    const updatedInstitute = await this.instituteRepository.findOne(
      instituteId,
    );
    if (updatedInstitute) {
      return updatedInstitute;
    }
    throw new InstituteNotFoundException(instituteId);
  }

  async deleteOne(instituteId: number): Promise<InstituteEntity[]> {
    const instituteToRemove = await this.instituteRepository.find({
      id: instituteId,
    });
    return await this.instituteRepository.remove(instituteToRemove);
  }
}
