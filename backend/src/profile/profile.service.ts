import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EmailObject } from 'src/auth/interfaces/authEmail.interface';
import { GroupEntity } from 'src/group/entities/group.entity';
import { SubGroupEntity } from 'src/group/entities/subGroup.entity';
import { GroupService } from 'src/group/group.service';
import { UserEntity } from 'src/user/entities/user.entity';
import { DeepPartial, Repository } from 'typeorm';
import { CreateProfileProfessorDto } from './dto/create-profile-professor.dto';
import { CreateProfileStudentDto } from './dto/create-profile-student.dto';
import { UpdateProfileProfessorDto } from './dto/update-profile-professor.dto';
import { UpdateProfileStudentDto } from './dto/update-profile-student.dto';
import { ProfileProfessorEntity } from './entities/profileProfessor.entity';
import { ProfileStudentEntity } from './entities/profileStudent.entity';
import { ProfileNotFoundException } from './exceptions/profile.exceptions';
import { ProfileEntity } from './interfaces/profile.interface';

@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(ProfileStudentEntity)
    private readonly studentRepository: Repository<ProfileStudentEntity>,

    @InjectRepository(ProfileProfessorEntity)
    private readonly professorRepository: Repository<ProfileProfessorEntity>,

    private readonly groupService: GroupService,
  ) {}

  async createStudent(
    profile: CreateProfileStudentDto,
  ): Promise<ProfileStudentEntity> {
    const newProfile = this.studentRepository.create(profile);

    const [user, group, subGroups] = [
      profile.userId ? ({ id: profile.userId } as UserEntity) : null,
      profile.groupId ? ({ id: profile.groupId } as GroupEntity) : null,
      profile.subGroupIds
        ? profile.subGroupIds.map(
            subGroupId => ({ id: subGroupId } as SubGroupEntity),
          )
        : null,
    ];

    newProfile.group = group;
    if (user) newProfile.user = user;
    if (subGroups) newProfile.subGroups = subGroups;

    return await this.studentRepository.save(newProfile);
  }

  async createProfessor(
    profile: CreateProfileProfessorDto,
  ): Promise<ProfileProfessorEntity> {
    const newProfile = this.professorRepository.create(profile);

    return await this.professorRepository.save(newProfile);
  }

  async provideProfile(
    emailObject: EmailObject,
    email: string,
  ): Promise<ProfileEntity> {
    const profile = await this.findOneByEmail(email);

    if (profile) {
      return profile;
    }

    const group = await this.groupService.findOneByName(emailObject.group);

    const groupId = group.id;

    const studentTicketNumber = Number(emailObject.ticketNumber);

    const newStudentProfile: CreateProfileStudentDto = {
      email,
      groupId,
      studentTicketNumber,
    };

    return await this.createStudent(newStudentProfile);
  }

  async findAllStudents(): Promise<ProfileStudentEntity[]> {
    return await this.studentRepository.find();
  }

  async findAllProfessors(): Promise<ProfileProfessorEntity[]> {
    return await this.professorRepository.find();
  }

  async findOneStudentById(profileId: number): Promise<ProfileStudentEntity> {
    return await this.studentRepository.findOne({ id: profileId });
  }

  async findOneProfessorById(
    profileId: number,
  ): Promise<ProfileProfessorEntity> {
    return await this.professorRepository.findOne({ id: profileId });
  }

  async findOneByEmail(userEmail: string): Promise<ProfileEntity> {
    let result;

    const findByStudents = await this.studentRepository.findOne({
      where: { email: userEmail },
    });

    if (findByStudents) {
      result = findByStudents;
    } else {
      const findByProfessors = await this.professorRepository.findOne({
        where: { email: userEmail },
      });
      result = findByProfessors;
    }

    return result;
  }

  async findOneStudentByEmail(
    userEmail: string,
  ): Promise<ProfileStudentEntity> {
    return await this.studentRepository.findOne({
      where: { email: userEmail },
    });
  }

  async findOneProfessorByEmail(
    userEmail: string,
  ): Promise<ProfileProfessorEntity> {
    return await this.professorRepository.findOne({
      where: { email: userEmail },
    });
  }

  async updateOneStudent(
    profileId: number,
    updateProfile: DeepPartial<UpdateProfileStudentDto>,
  ): Promise<ProfileStudentEntity> {
    const [user, group, subGroups] = [
      updateProfile.userId
        ? ({ id: updateProfile.userId } as UserEntity)
        : null,
      updateProfile.groupId
        ? ({ id: updateProfile.groupId } as GroupEntity)
        : null,
      updateProfile.subGroupIds
        ? updateProfile.subGroupIds.map(
            subGroupId => ({ id: subGroupId } as SubGroupEntity),
          )
        : null,
    ];

    const newStudentProfile = this.studentRepository.create(updateProfile);

    if (user) newStudentProfile.user = user;
    if (group) newStudentProfile.group = group;
    if (subGroups) newStudentProfile.subGroups = subGroups;

    await this.studentRepository.update({ id: profileId }, newStudentProfile);

    const updatedProfile = await this.findOneStudentById(profileId);

    if (updatedProfile) {
      return updatedProfile;
    }
    throw new ProfileNotFoundException(profileId);
  }

  async updateOneProfessor(
    profileId: number,
    updateProfile: DeepPartial<UpdateProfileProfessorDto>,
  ): Promise<ProfileProfessorEntity> {
    await this.professorRepository.update({ id: profileId }, updateProfile);

    const updatedProfile = await this.findOneProfessorById(profileId);
    if (updatedProfile) {
      return updatedProfile;
    }
    throw new ProfileNotFoundException(profileId);
  }

  async deleteOneStudent(profileId: number): Promise<ProfileStudentEntity[]> {
    const profileToRemove = await this.studentRepository.find({
      id: profileId,
    });
    return await this.studentRepository.remove(profileToRemove);
  }

  async deleteOneProfessor(
    profileId: number,
  ): Promise<ProfileProfessorEntity[]> {
    const profileToRemove = await this.professorRepository.find({
      id: profileId,
    });
    return await this.professorRepository.remove(profileToRemove);
  }

  async linkStudentToUser(
    user: UserEntity,
    email: string,
  ): Promise<ProfileEntity> {
    const profileStudent = await this.findOneStudentByEmail(email);

    if (profileStudent) {
      return await this.updateOneStudent(profileStudent.id, user);
    }

    const profileProfessor = await this.findOneProfessorByEmail(email);
    if (profileProfessor) {
      return await this.updateOneProfessor(profileProfessor.id, user);
    }

    throw new ProfileNotFoundException(profileStudent.id);
  }

  async linkProfessorToUser(
    user: UserEntity,
    profileId: number,
  ): Promise<ProfileProfessorEntity> {
    const updateData = {
      userId: user.id,
    };

    return await this.updateOneProfessor(profileId, updateData);
  }
}
