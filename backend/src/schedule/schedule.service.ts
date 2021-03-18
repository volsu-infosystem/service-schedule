import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GroupEntity } from 'src/group/entities/group.entity';
import { GroupService } from 'src/group/group.service';
import { studyLevelEnum } from 'src/profile/enums/studyLevel.enum';
import { AdmissionYearNotFoundException } from 'src/profile/exceptions/admissionYear.exceptions';
import { Repository, DeepPartial } from 'typeorm';
import { CellService } from './cell.service';
import { CreateScheduleDto } from './dto/create-schedule.dto';
import { UpdateScheduleDto } from './dto/update-schedule.dto';
import { ScheduleEntity } from './entities/schedule.entity';
import { ScheduleNotFoundException } from './exceptions/schedule.exceptions';

@Injectable()
export class ScheduleService {
  constructor(
    @InjectRepository(ScheduleEntity)
    private readonly scheduleRepository: Repository<ScheduleEntity>,
    private readonly groupService: GroupService,
    private readonly cellService: CellService,
  ) {}

  async create(schedule: CreateScheduleDto): Promise<ScheduleEntity> {
    const newSchedule = this.scheduleRepository.create(schedule);
    newSchedule.group = await this.groupService.findOneById(schedule.groupId);
    return await this.scheduleRepository.save(newSchedule);
  }

  async createDefault(group: GroupEntity): Promise<ScheduleEntity[]> {
    const groupAdmissionYear = await this.groupService.getAdmissionYear(group);
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
      const newSchedule = await this.scheduleRepository.create({
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

  /* @TODO Mock ScheduleResponse Interface */
  async getScheduleByGroupAndSemester(
    group: number,
    semester: number,
  ): Promise<any> {
    const schedule = await this.scheduleRepository
      .createQueryBuilder('schedule')
      .where('schedule.group.id = :group AND schedule.semester = :semester', {
        group,
        semester,
      })
      .leftJoinAndSelect('schedule.group', 'groups')
      .leftJoinAndSelect('groups.subGroups', 'subGroups')
      .leftJoinAndSelect('subGroups.lessons', 'lessons')
      .leftJoinAndSelect('lessons.professor', 'professor')
      .leftJoinAndSelect('lessons.room', 'room')
      .leftJoinAndSelect('lessons.discipline', 'discipline')
      .getMany();
    return schedule;
  }

  /* @TODO Mock ScheduleResponse Interface */
  async getScheduleByInstituteAndSemester(
    institute: number,
    semester: number,
  ): Promise<any> {
    const schedule = await this.scheduleRepository
      .createQueryBuilder('schedule')
      .where('schedule.semester = :semester', { semester })
      .leftJoinAndSelect('schedule.group', 'groups')
      .innerJoin('groups.cathedra', 'cathedra')
      .innerJoin('cathedra.institute', 'institute')
      .andWhere('cathedra.institute.id = :institute', {
        institute,
      })
      .leftJoinAndSelect('schedule.cells', 'cells')
      .leftJoinAndSelect('cells.subCells', 'subCells')
      .leftJoinAndSelect('subCells.lessons', 'lessons')
      .leftJoinAndSelect('lessons.professor', 'professor')
      .leftJoinAndSelect('lessons.room', 'room')
      .leftJoinAndSelect('lessons.discipline', 'discipline')
      .getMany();
    return schedule;
  }

  async getScheduleByGroup(group: string): Promise<ScheduleEntity[]> {
    return await this.scheduleRepository.find({ where: { group } });
  }
}
