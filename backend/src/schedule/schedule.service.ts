import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RoomService } from 'src/campus/room.service';
import { DisciplineService } from 'src/discipline/discipline.service';
import { GroupEntity } from 'src/group/entities/group.entity';
import { GroupService } from 'src/group/group.service';
import { studyLevelEnum } from 'src/profile/enums/studyLevel.enum';
import { AdmissionYearNotFoundException } from 'src/profile/exceptions/admissionYear.exceptions';
import { ProfileService } from 'src/profile/profile.service';
import { Repository, DeepPartial } from 'typeorm';
import { CreateScheduleDto } from './dto/create-schedule.dto';
import { UpdateScheduleDto } from './dto/update-schedule.dto';
import { ScheduleEntity } from './entities/schedule.entity';
import { ScheduleNotFoundException } from './exceptions/schedule.exceptions';
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
    const newSchedule = this.scheduleRepository.create(schedule);
    newSchedule.group = await this.groupService.findOneById(schedule.groupId);
    return await this.scheduleRepository.save(newSchedule);
  }

  async createDefault(group: GroupEntity): Promise<ScheduleEntity[]> {
    const groupAdmissionYear = await this.groupService.getAdmissionYear(group);
    console.log(groupAdmissionYear);
    const createdSchedules = [];
    let semesterCount;

    switch (groupAdmissionYear.admissionYear.studyLevel) {
      case studyLevelEnum.Bachelor: {
        semesterCount = 8;
        break;
      }
      case studyLevelEnum.Magistracy: {
        semesterCount = 4;
        break;
      }
      case studyLevelEnum.Specialty: {
        semesterCount = 10;
        break;
      }
      default:
        throw new AdmissionYearNotFoundException(groupAdmissionYear.id);
    }

    for (let i = 1; i <= semesterCount; i++) {
      const newSchedule = this.scheduleRepository.create({
        semester: i,
        group,
      });
      createdSchedules.push(await this.scheduleRepository.save(newSchedule));
    }
    return createdSchedules;
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
    throw new ScheduleNotFoundException(scheduleId);
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
