import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeepPartial } from 'typeorm';
import { CreateCampusDto } from './dto/create-campus.dto';
import { UpdateCampusDto } from './dto/update-campus.dto';
import { CampusEntity } from './entities/campus.entity';
import { CampusNotFoundException } from './exceptions/campus.exceptions';

@Injectable()
export class CampusService {
  constructor(
    @InjectRepository(CampusEntity)
    private readonly campusRepository: Repository<CampusEntity>,
  ) {}

  async create(campus: CreateCampusDto): Promise<CampusEntity> {
    const newCampus = this.campusRepository.create(campus);
    return await this.campusRepository.save(newCampus);
  }

  async findAll(): Promise<CampusEntity[]> {
    return await this.campusRepository.find();
  }

  async findOneById(campusId: number): Promise<CampusEntity> {
    return await this.campusRepository.findOne({ id: campusId });
  }

  async updateOne(
    campusId: number,
    updateCampus: DeepPartial<UpdateCampusDto>,
  ): Promise<CampusEntity> {
    await this.campusRepository.update({ id: campusId }, updateCampus);
    const updatedCampus = await this.campusRepository.findOne(campusId);
    if (updatedCampus) {
      return updatedCampus;
    }
    throw new CampusNotFoundException(campusId);
  }

  async deleteOne(campusId: number): Promise<CampusEntity[]> {
    const campusToRemove = await this.campusRepository.find({ id: campusId });
    return await this.campusRepository.remove(campusToRemove);
  }
}
