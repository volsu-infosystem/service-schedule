import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { throwError } from 'rxjs';
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

    @InjectRepository(ProfileProfessorEntity)
    private readonly professorRepository: Repository<ProfileProfessorEntity>,
  ) {}

  async createStudent(
    profile: CreateProfileStudentDto,
  ): Promise<ProfileStudentEntity> {
    const newProfile = this.studentRepository.create(profile);

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

  async updateOneStudent(
    profileId: number,
    updateProfile: DeepPartial<UpdateProfileStudentDto>,
  ): Promise<ProfileStudentEntity> {
    await this.studentRepository.update({ id: profileId }, updateProfile);

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
    profileId: number,
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

    throw new HttpException('Not found', HttpStatus.NOT_FOUND);
  }

  async linkProfessorToUser(
    user: UserEntity,
    profileId: number,
  ): Promise<ProfileProfessorEntity> {
    const updateData = {
      user: user,
    };

    return await this.updateOneProfessor(profileId, updateData);
  }
}
