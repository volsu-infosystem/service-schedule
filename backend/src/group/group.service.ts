import {
  HttpException,
  HttpStatus,
  forwardRef,
  Inject,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { StudyDirectionEntity } from 'src/discipline/entities/studyDirection.entity';
import { CathedraEntity } from 'src/institute/entities/cathedra.entity';
import { AdmissionYearEntity } from 'src/profile/entities/admissionYear.entity';
import { ProfileStudentEntity } from 'src/profile/entities/profileStudent.entity';
import { ScheduleService } from 'src/schedule/schedule.service';
import { Repository, DeepPartial } from 'typeorm';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import { GroupEntity } from './entities/group.entity';

@Injectable()
export class GroupService {
  constructor(
    @InjectRepository(GroupEntity)
    private readonly groupRepository: Repository<GroupEntity>,
    @Inject(forwardRef(() => ScheduleService))
    private readonly scheduleService: ScheduleService,

  ) {}

  async create(group: CreateGroupDto): Promise<GroupEntity> {
    const newGroup = this.groupRepository.create(group);

    newGroup.studyDirection = {
      id: group.studyDirectionId,
    } as StudyDirectionEntity;
    newGroup.cathedra = { id: group.cathedraId } as CathedraEntity;
    newGroup.admissionYear = {
      id: group.admissionYearId,
    } as AdmissionYearEntity;

    if (group.groupLeaderId)
      newGroup.groupLeader = {
        id: group.groupLeaderId,
      } as ProfileStudentEntity;

    const createdGroup = await this.groupRepository.save(newGroup);
    await this.scheduleService.createDefault(createdGroup);
    return createdGroup;
  }

  async findAll(): Promise<GroupEntity[]> {
    return await this.groupRepository.find();
  }

  async findOneById(groupId: number): Promise<GroupEntity> {
    return await this.groupRepository.findOne({ id: groupId });
  }
//i
  async getGroupByName(groupName: string): Promise<GroupEntity> {
    return await this.groupRepository.findOne({ name: groupName });
  }

  async getAdmissionYear(group: GroupEntity): Promise<GroupEntity> {
    return await this.groupRepository.findOne({
      where: group,
      relations: ['admissionYear'],
    });
  }

  async updateOne(
    groupId: number,
    updateGroup: DeepPartial<UpdateGroupDto>,
  ): Promise<GroupEntity> {
    const [cathedra, studyDirection, admissionYear, groupLeader] = [
      updateGroup.cathedraId
        ? ({ id: updateGroup.cathedraId } as CathedraEntity)
        : null,
      updateGroup.studyDirectionId
        ? ({ id: updateGroup.studyDirectionId } as StudyDirectionEntity)
        : null,
      updateGroup.admissionYearId
        ? ({ id: updateGroup.admissionYearId } as AdmissionYearEntity)
        : null,
      updateGroup.groupLeaderId
        ? ({ id: updateGroup.groupLeaderId } as ProfileStudentEntity)
        : null,
    ];

    const newGroup = this.groupRepository.create(updateGroup);

    if (cathedra) newGroup.cathedra = cathedra;
    if (studyDirection) newGroup.studyDirection = studyDirection;
    if (admissionYear) newGroup.admissionYear = admissionYear;
    if (groupLeader) newGroup.groupLeader = groupLeader;

    await this.groupRepository.update({ id: groupId }, newGroup);
    const updatedGroup = await this.groupRepository.findOne(groupId);
    if (updatedGroup) {
      return updatedGroup;
    }
    throw new HttpException('Not found', HttpStatus.NOT_FOUND);
  }

  async deleteOne(groupId: number): Promise<GroupEntity[]> {
    const groupToRemove = await this.groupRepository.find({ id: groupId });
    return await this.groupRepository.remove(groupToRemove);
  }
}
