import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RoomService } from 'src/campus/room.service';
import { DisciplineService } from 'src/discipline/discipline.service';
import { ProfileService } from 'src/profile/profile.service';
import { Repository, DeepPartial } from 'typeorm';
import { CreateLessonDto } from './dto/create-lesson.dto';
import { UpdateLessonDto } from './dto/update-lesson.dto';
import { LessonEntity } from './entities/lesson.entity';

@Injectable()
export class LessonService {
  constructor(
    @InjectRepository(LessonEntity)
    private readonly lessonRepository: Repository<LessonEntity>,
    private readonly disciplineService: DisciplineService,
    private readonly profileService: ProfileService,
    private readonly roomService: RoomService,
  ) {}

  async create(lesson: CreateLessonDto): Promise<LessonEntity> {
    lesson.discipline = await this.disciplineService.findOneById(
      lesson.disciplineId,
    );
    lesson.professor = await this.profileService.findOneProfessorById(
      lesson.professorId,
    );
    lesson.room = await this.roomService.findOneById(lesson.roomId);

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
