import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeepPartial } from 'typeorm';
import { CreateDisciplineHouredDto } from './dto/create-discipline-houred';
import { UpdateDisciplineHouredDto } from './dto/update-discipline-houred.dto';
import { DisciplineHouredEntity } from './entities/disciplineHoured.entity';
import { DisciplineHouredNotFoundException } from './exceptions/disciplineHoured.exceptions';

@Injectable()
export class DisciplineHouredService {
  constructor(
    @InjectRepository(DisciplineHouredEntity)
    private readonly disciplineHouredRepository: Repository<
      DisciplineHouredEntity
    >,
  ) {}

  async create(
    disciplinehoured: CreateDisciplineHouredDto,
  ): Promise<DisciplineHouredEntity> {
    const newDisciplineHoured = this.disciplineHouredRepository.create(
      disciplinehoured,
    );
    return await this.disciplineHouredRepository.save(newDisciplineHoured);
  }

  async findAll(): Promise<DisciplineHouredEntity[]> {
    return await this.disciplineHouredRepository.find();
  }

  async findAllByGroupAndSemester(group: string, semester: number): Promise<DisciplineHouredEntity[]> {
    return await this.disciplineHouredRepository.createQueryBuilder('disciplineHoured')
    .innerJoin('disciplineHoured.studyDirection', 'studyDirection')
    .innerJoin('studyDirection.group', 'group')
    .where('group.name = :group AND disciplineHoured.semester = :semester', { group, semester })
    .innerJoinAndSelect('disciplineHoured.discipline', 'discipline')
    .getMany();
  }

  async findOneById(
    disciplinehouredId: number,
  ): Promise<DisciplineHouredEntity> {
    return await this.disciplineHouredRepository.findOne({
      id: disciplinehouredId,
    });
  }

  async updateOne(
    disciplinehouredId: number,
    updateDisciplineHoured: DeepPartial<UpdateDisciplineHouredDto>,
  ): Promise<DisciplineHouredEntity> {
    await this.disciplineHouredRepository.update(
      { id: disciplinehouredId },
      updateDisciplineHoured,
    );
    const updatedDisciplineHoured = await this.disciplineHouredRepository.findOne(
      disciplinehouredId,
    );
    if (updatedDisciplineHoured) {
      return updatedDisciplineHoured;
    }
    throw new DisciplineHouredNotFoundException(disciplinehouredId);
  }

  async deleteOne(
    disciplinehouredId: number,
  ): Promise<DisciplineHouredEntity[]> {
    const disciplinehouredToRemove = await this.disciplineHouredRepository.find(
      { id: disciplinehouredId },
    );
    return await this.disciplineHouredRepository.remove(
      disciplinehouredToRemove,
    );
  }
}
