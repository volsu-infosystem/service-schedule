import {
  Injectable,
  HttpException,
  HttpStatus,
  forwardRef,
  Inject,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RoomService } from 'src/campus/room.service';
import { DisciplineService } from 'src/discipline/discipline.service';
import { ProfileService } from 'src/profile/profile.service';
import { Repository, DeepPartial } from 'typeorm';
import { CreateLessonDto } from './dto/create-lesson.dto';
import { UpdateLessonDto } from './dto/update-lesson.dto';
import { LessonEntity } from './entities/lesson.entity';
import { ScheduleService } from './schedule.service';

@Injectable()
export class LessonService {
  constructor(
    @InjectRepository(LessonEntity)
    private readonly lessonRepository: Repository<LessonEntity>,
    private readonly disciplineService: DisciplineService,
    private readonly profileService: ProfileService,
    private readonly roomService: RoomService,
    @Inject(forwardRef(() => ScheduleService))
    private readonly scheduleService: ScheduleService,
  ) {}

  async create(lesson: CreateLessonDto): Promise<LessonEntity> {
    const [schedule, discipline, professor, room] = await Promise.all([
      this.scheduleService.findOneById(lesson.scheduleId),
      this.disciplineService.findOneById(lesson.disciplineId),
      this.profileService.findOneProfessorById(lesson.professorId),
      this.roomService.findOneById(lesson.roomId),
    ]);

    lesson.schedule = schedule;
    lesson.discipline = discipline;
    lesson.professor = professor;
    lesson.room = room;

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
    const [schedule, discipline, professor, room] = await Promise.all([
      updateLesson.scheduleId
        ? this.scheduleService.findOneById(updateLesson.scheduleId)
        : null,
      updateLesson.disciplineId
        ? this.disciplineService.findOneById(updateLesson.disciplineId)
        : null,
      updateLesson.professorId
        ? this.profileService.findOneProfessorById(updateLesson.professorId)
        : null,
      updateLesson.roomId
        ? this.roomService.findOneById(updateLesson.roomId)
        : null,
    ]);

    if (schedule) updateLesson.schedule = schedule;
    if (discipline) updateLesson.discipline = discipline;
    if (professor) updateLesson.professor = professor;
    if (room) updateLesson.room = room;

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
      relations: ['discipline', 'professor', 'room'],
    });
  }
}
