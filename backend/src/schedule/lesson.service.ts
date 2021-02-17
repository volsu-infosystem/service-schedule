import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeepPartial } from 'typeorm';
import { CreateLessonDto } from './dto/create-lesson.dto';
import { UpdateLessonDto } from './dto/update-lesson.dto';
import { LessonEntity } from './entities/lesson.entity';

@Injectable()
export class LessonService {
  constructor(
    @InjectRepository(LessonEntity)
    private readonly lessonRepository: Repository<LessonEntity>,
  ) {}

  async create(lesson: CreateLessonDto): Promise<LessonEntity> {
    const newLesson = this.lessonRepository.create(lesson);
    return await this.lessonRepository.save(newLesson);
  }

  async findAll(): Promise<LessonEntity[]> {
    return await this.lessonRepository.find();
  }

  async findOneById(lessonId: number): Promise<LessonEntity> {
    return await this.lessonRepository.findOne({ id: lessonId });
  }

  async updateOne(
    lessonId: number,
    updateLesson: DeepPartial<UpdateLessonDto>,
  ): Promise<LessonEntity> {
    await this.lessonRepository.update({ id: lessonId }, updateLesson);
    const updatedLesson = await this.lessonRepository.findOne(lessonId);
    if (updatedLesson) {
      return updatedLesson;
    }
    throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
  }

  async deleteOne(lessonId: number): Promise<LessonEntity[]> {
    const lessonToRemove = await this.lessonRepository.find({
      id: lessonId,
    });
    return await this.lessonRepository.remove(lessonToRemove);
  }

  async getLessons(schedule: number): Promise<LessonEntity[]> {
    return await this.lessonRepository.find({
      where: { schedule },
      loadRelationIds: true,
    });
  }
}
