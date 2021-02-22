import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RoomService } from 'src/campus/room.service';
import { DisciplineService } from 'src/discipline/discipline.service';
import { GroupService } from 'src/group/group.service';
import { ProfileService } from 'src/profile/profile.service';
import { Repository, DeepPartial } from 'typeorm';
import { CreateScheduleDto } from './dto/create-schedule.dto';
import { UpdateScheduleDto } from './dto/update-schedule.dto';
import { ScheduleEntity } from './entities/schedule.entity';
import { LessonService } from './lesson.service';
import { LessonResponse } from './schedule.interface';

@Injectable()
export class ScheduleService {
  constructor(
    @InjectRepository(ScheduleEntity)
    private readonly scheduleRepository: Repository<ScheduleEntity>,
    private readonly lessonService: LessonService,
    private readonly disciplineService: DisciplineService,
    private readonly roomService: RoomService,
    private readonly profileService: ProfileService,
    private readonly groupService: GroupService,
  ) {}

  async create(schedule: CreateScheduleDto): Promise<ScheduleEntity> {
    schedule.group = await this.groupService.findOneById(schedule.groupId);
    const newSchedule = this.scheduleRepository.create(schedule);
    return await this.scheduleRepository.save(newSchedule);
  }

  async findAll(): Promise<ScheduleEntity[]> {
    return await this.scheduleRepository.find();
  }

  async findOneById(scheduleId: number): Promise<ScheduleEntity> {
    return await this.scheduleRepository.findOne({ id: scheduleId });
  }

  async updateOne(
    scheduleId: number,
    updateSchedule: DeepPartial<UpdateScheduleDto>,
  ): Promise<ScheduleEntity> {
    await this.scheduleRepository.update({ id: scheduleId }, updateSchedule);
    const updatedSchedule = await this.scheduleRepository.findOne(scheduleId);
    if (updatedSchedule) {
      return updatedSchedule;
    }
    throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
  }

  async deleteOne(scheduleId: number): Promise<ScheduleEntity[]> {
    const scheduleToRemove = await this.scheduleRepository.find({
      id: scheduleId,
    });
    return await this.scheduleRepository.remove(scheduleToRemove);
  }

  async getSchedule(
    group: string,
    semester: number,
  ): Promise<LessonResponse[]> {
    const schedule = await this.scheduleRepository.findOne({
      where: { group, semester },
    });

    const lessonsList = await this.lessonService.getLessons(schedule.id);
    const lessonsListResponse = await Promise.all(
      lessonsList.map(async lesson => {
        const lessonResponse: LessonResponse = {
          id: lesson.id,
          discipline: lesson.discipline.name,
          professor: lesson.professor.initials,
          room: lesson.room.name,
          lessonType: lesson.lessonType,
          importanceStatus: lesson.importanceStatus,
          startTime: lesson.startTime,
          endTime: lesson.endTime,
          periodicity: lesson.periodicity,
        };
        return lessonResponse;
      }),
    );

    return lessonsListResponse;
  }

  async getScheduleByGroup(group: string): Promise<ScheduleEntity[]> {
    return await this.scheduleRepository.find({ where: { group } });
  }
}
