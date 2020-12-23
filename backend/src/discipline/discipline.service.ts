import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeepPartial } from 'typeorm';
import { CreateDisciplineDto } from './dto/create-discipline.dto';
import { UpdateDisciplineDto } from './dto/update-discipline.dto';
import { DisciplineEntity } from './entities/discipline.entity';
import { DisciplineNotFoundException } from './exceptions/discipline.exceptions';

@Injectable()
export class DisciplineService {
  constructor(
    @InjectRepository(DisciplineEntity)
    private readonly disciplineRepository: Repository<DisciplineEntity>,
  ) {}

  async create(discipline: CreateDisciplineDto): Promise<DisciplineEntity> {
    const newDiscipline = this.disciplineRepository.create(discipline);
    return await this.disciplineRepository.save(newDiscipline);
  }

  async findAll(): Promise<DisciplineEntity[]> {
    return await this.disciplineRepository.find();
  }

  async findOneById(disciplineId: number): Promise<DisciplineEntity> {
    return await this.disciplineRepository.findOne({ id: disciplineId });
  }

  async updateOne(
    disciplineId: number,
    updateDiscipline: DeepPartial<UpdateDisciplineDto>,
  ): Promise<DisciplineEntity> {
    await this.disciplineRepository.update(
      { id: disciplineId },
      updateDiscipline,
    );
    const updatedDiscipline = await this.disciplineRepository.findOne(
      disciplineId,
    );
    if (updatedDiscipline) {
      return updatedDiscipline;
    }
    throw new DisciplineNotFoundException(disciplineId);
  }

  async deleteOne(disciplineId: number): Promise<DisciplineEntity[]> {
    const disciplineToRemove = await this.disciplineRepository.find({
      id: disciplineId,
    });
    return await this.disciplineRepository.remove(disciplineToRemove);
  }
}
