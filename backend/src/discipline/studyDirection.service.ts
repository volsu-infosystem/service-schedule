import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeepPartial } from 'typeorm';
import { CreateStudyDirectionDto } from './dto/create-study-direction';
import { UpdateStudyDirectionDto } from './dto/update-study-direction.dto';
import { StudyDirectionEntity } from './entities/studyDirection.entity';
import { StudyDirectionNotFoundException } from './exceptions/studyDirection.exceptions';

@Injectable()
export class StudyDirectionService {
  constructor(
    @InjectRepository(StudyDirectionEntity)
    private readonly studydirectionRepository: Repository<StudyDirectionEntity>,
  ) {}

  async create(
    studydirection: CreateStudyDirectionDto,
  ): Promise<StudyDirectionEntity> {
    const newStudyDirection = this.studydirectionRepository.create(
      studydirection,
    );
    return await this.studydirectionRepository.save(newStudyDirection);
  }

  async findAll(): Promise<StudyDirectionEntity[]> {
    return await this.studydirectionRepository.find();
  }

  async findOneById(studydirectionId: number): Promise<StudyDirectionEntity> {
    return await this.studydirectionRepository.findOne({
      id: studydirectionId,
    });
  }

  async updateOne(
    studydirectionId: number,
    updateStudyDirection: DeepPartial<UpdateStudyDirectionDto>,
  ): Promise<StudyDirectionEntity> {
    await this.studydirectionRepository.update(
      { id: studydirectionId },
      updateStudyDirection,
    );
    const updatedStudyDirection = await this.studydirectionRepository.findOne(
      studydirectionId,
    );
    if (updatedStudyDirection) {
      return updatedStudyDirection;
    }
    throw new StudyDirectionNotFoundException(studydirectionId);
  }

  async deleteOne(studydirectionId: number): Promise<StudyDirectionEntity[]> {
    const studydirectionToRemove = await this.studydirectionRepository.find({
      id: studydirectionId,
    });
    return await this.studydirectionRepository.remove(studydirectionToRemove);
  }
}
