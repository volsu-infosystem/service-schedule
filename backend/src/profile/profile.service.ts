import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GroupEntity } from 'src/group/entities/group.entity';
import { GroupService } from 'src/group/group.service';
import { SubGroupEntity } from 'src/group/entities/subGroup.entity';
import { UserEntity } from 'src/user/entities/user.entity';
import { DeepPartial, Repository } from 'typeorm';
import { CreateProfileProfessorDto } from './dto/create-profile-professor.dto';
import { CreateProfileStudentDto } from './dto/create-profile-student.dto';
import { UpdateProfileProfessorDto } from './dto/update-profile-professor.dto';
import { UpdateProfileStudentDto } from './dto/update-profile-student.dto';
import { ProfileProfessorEntity } from './entities/profileProfessor.entity';
import { ProfileStudentEntity } from './entities/profileStudent.entity';
import {
  ProfileByEmailNotFoundException,
  ProfileNotFoundException,
} from './exceptions/profile.exceptions';
import { ProfileEntity } from './interfaces/profile.interface';

@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(ProfileStudentEntity)
    private readonly studentRepository: Repository<ProfileStudentEntity>,
    private readonly groupService: GroupService, //не знал куда впихнуть
    @InjectRepository(ProfileProfessorEntity)
    private readonly professorRepository: Repository<ProfileProfessorEntity>,
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

    if (result) {
      return result;
    } else throw new ProfileByEmailNotFoundException(userEmail);
  }

  async findOneStudentByEmail(
    userEmail: string,
  ): Promise<ProfileStudentEntity> {
    const result = await this.studentRepository.findOne({
      where: { email: userEmail },
    });

    if (result) {
      return result;
    } else throw new ProfileByEmailNotFoundException(userEmail);
  }

  async findOneProfessorByEmail(
    userEmail: string,
  ): Promise<ProfileProfessorEntity> {
    const result = await this.professorRepository.findOne({
      where: { email: userEmail },
    });

    if (result) {
      return result;
    } else throw new ProfileByEmailNotFoundException(userEmail);
  }

  //________________my code begins here
  async provideProfile(userEmail: string){

    const profile = await this.findOneByEmail(userEmail)
    if (profile) return profile

    const profileDataByEmail = await this.getDateByEmail(userEmail)
    const newProfile = await this.createStudent(profileDataByEmail)

    return newProfile
  }

  async getDateByEmail(userEmail: string): Promise<any>{
    const profileData = userEmail.split('_');

    const [groupName, ticketNumber] = [
      profileData[0],
      profileData[1].replace('@volsu.ru', ''),
    ]

    const responseData ={
      ticketNumber,
      groupId: this.groupService.getGroupByName(groupName)
    };
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

    newStudentProfile.user = user;
    newStudentProfile.group = group;
    newStudentProfile.subGroups = subGroups;

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
