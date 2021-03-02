import { Injectable, forwardRef, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RoomEntity } from 'src/campus/entities/room.entity';
import { RoomService } from 'src/campus/room.service';
import { DisciplineService } from 'src/discipline/discipline.service';
import { DisciplineEntity } from 'src/discipline/entities/discipline.entity';
import { SubGroupEntity } from 'src/group/entities/subGroup.entity';
import { SubGroupService } from 'src/group/subGroup.service';
import { ProfileProfessorEntity } from 'src/profile/entities/profileProfessor.entity';
import { ProfileService } from 'src/profile/profile.service';
import { Repository, DeepPartial } from 'typeorm';
import { CreateLessonDto } from './dto/create-lesson.dto';
import { UpdateLessonDto } from './dto/update-lesson.dto';
import { LessonEntity } from './entities/lesson.entity';
import { ScheduleEntity } from './entities/schedule.entity';
import { LessonNotFoundException } from './exceptions/lesson.exceptions';
import { ScheduleService } from './schedule.service';

@Injectable()
export class LessonService {
  constructor(
    @InjectRepository(LessonEntity)
    private readonly lessonRepository: Repository<LessonEntity>,
    private readonly disciplineService: DisciplineService,
    private readonly profileService: ProfileService,
    private readonly roomService: RoomService,
    private readonly subGroupService: SubGroupService,
    @Inject(forwardRef(() => ScheduleService))
    private readonly scheduleService: ScheduleService,
  ) {}

  async create(lesson: CreateLessonDto): Promise<LessonEntity> {
    const newLesson = this.lessonRepository.create(lesson);
    newLesson.schedule = { id: lesson.scheduleId } as ScheduleEntity;
    newLesson.discipline = { id: lesson.disciplineId } as DisciplineEntity;
    newLesson.professor = { id: lesson.professorId } as ProfileProfessorEntity;
    newLesson.room = { id: lesson.roomId } as RoomEntity;
    newLesson.subGroup = { id: lesson.subGroupId } as SubGroupEntity;

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
    const [
      schedule,
      discipline,
      professor,
      room,
      subGroup,
    ] = await Promise.all([
      updateLesson.scheduleId
        ? ({ id: updateLesson.scheduleId } as ScheduleEntity)
        : null,
      updateLesson.disciplineId
        ? ({ id: updateLesson.disciplineId } as DisciplineEntity)
        : null,
      updateLesson.professorId
        ? ({ id: updateLesson.professorId } as ProfileProfessorEntity)
        : null,
      updateLesson.roomId ? ({ id: updateLesson.roomId } as RoomEntity) : null,
      updateLesson.subGroupId
        ? ({ id: updateLesson.subGroupId } as SubGroupEntity)
        : null,
    ]);

    const newLesson = this.lessonRepository.create(updateLesson);

    if (schedule) newLesson.schedule = schedule;
    if (discipline) newLesson.discipline = discipline;
    if (professor) newLesson.professor = professor;
    if (room) newLesson.room = room;
    if (subGroup) newLesson.subGroup = subGroup;

    await this.lessonRepository.update({ id: lessonId }, newLesson);
    const updatedLesson = await this.lessonRepository.findOne(lessonId);
    if (updatedLesson) {
      return updatedLesson;
    }
    throw new LessonNotFoundException(newLesson.id);
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
