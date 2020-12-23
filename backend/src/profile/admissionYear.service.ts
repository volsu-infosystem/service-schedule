import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeepPartial } from 'typeorm';
import { CreateAdmissionYearDto } from './dto/create-admission-year.dto';
import { UpdateAdmissionYearDto } from './dto/update-admission-year.dto';
import { AdmissionYearEntity } from './entities/admissionYear.entity';
import { AdmissionYearNotFoundException } from './exceptions/admissionYear.exceptions';

@Injectable()
export class AdmissionYearService {
  constructor(
    @InjectRepository(AdmissionYearEntity)
    private readonly admissionYearRepository: Repository<AdmissionYearEntity>,
  ) {}

  async create(
    admissionYear: CreateAdmissionYearDto,
  ): Promise<AdmissionYearEntity> {
    const newAdmissionYear = this.admissionYearRepository.create(admissionYear);
    return await this.admissionYearRepository.save(newAdmissionYear);
  }

  async findAll(): Promise<AdmissionYearEntity[]> {
    return await this.admissionYearRepository.find();
  }

  async findOneById(admissionYearId: number): Promise<AdmissionYearEntity> {
    return await this.admissionYearRepository.findOne({ id: admissionYearId });
  }

  async updateOne(
    admissionYearId: number,
    updateAdmissionYear: DeepPartial<UpdateAdmissionYearDto>,
  ): Promise<AdmissionYearEntity> {
    await this.admissionYearRepository.update(
      { id: admissionYearId },
      updateAdmissionYear,
    );
    const updatedAdmissionYear = await this.admissionYearRepository.findOne(
      admissionYearId,
    );
    if (updatedAdmissionYear) {
      return updatedAdmissionYear;
    }
    throw new AdmissionYearNotFoundException(admissionYearId);
  }

  async deleteOne(admissionYearId: number): Promise<AdmissionYearEntity[]> {
    const admissionYearToRemove = await this.admissionYearRepository.find({
      id: admissionYearId,
    });
    return await this.admissionYearRepository.remove(admissionYearToRemove);
  }
}
