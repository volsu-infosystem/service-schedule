import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';

import { ProfileService } from './profile.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ProfileStudentEntity } from './entities/profileStudent.entity';
import { CreateProfileStudentDto } from './dto/create-profile-student.dto';
import { UpdateProfileStudentDto } from './dto/update-profile-student.dto';
import { CreateProfileProfessorDto } from './dto/create-profile-professor.dto';
import { UpdateProfileProfessorDto } from './dto/update-profile-professor.dto';
import { ProfileProfessorEntity } from './entities/profileProfessor.entity';

@Controller('profile')
@UseGuards(JwtAuthGuard)
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Post('student')
  async createStudent(
    @Body() createProfileDto: CreateProfileStudentDto,
  ): Promise<ProfileStudentEntity> {
    return await this.profileService.createStudent(createProfileDto);
  }

  @Get('student')
  async findAllStudents(): Promise<ProfileStudentEntity[]> {
    return await this.profileService.findAllStudents();
  }

  @Get('student/:id')
  async findOneStudentById(
    @Param('id') profileId: number,
  ): Promise<ProfileStudentEntity> {
    return await this.profileService.findOneStudentById(profileId);
  }

  @Put('student/:id')
  async updateStudent(
    @Param('id') profileId: number,
    @Body() updateProfileDto: UpdateProfileStudentDto,
  ): Promise<ProfileStudentEntity> {
    return await this.profileService.updateOneStudent(
      profileId,
      updateProfileDto,
    );
  }

  @Delete('student/:id')
  async removeStudent(
    @Param('id') profileId: number,
  ): Promise<ProfileStudentEntity[]> {
    return await this.profileService.deleteOneStudent(profileId);
  }

  @Post('professor')
  async createProfessor(
    @Body() createProfileDto: CreateProfileProfessorDto,
  ): Promise<ProfileProfessorEntity> {
    return await this.profileService.createProfessor(createProfileDto);
  }

  @Get('professor')
  async findAllProfessors(): Promise<ProfileProfessorEntity[]> {
    return await this.profileService.findAllProfessors();
  }

  @Get('professor/:id')
  async findOneProfessorById(
    @Param('id') profileId: number,
  ): Promise<ProfileProfessorEntity> {
    return await this.profileService.findOneProfessorById(profileId);
  }

  @Get('professor/discipline/:id')
  async findProfessorsByDiscipline(
    @Param('id') disciplineId: number,
  ): Promise<ProfileProfessorEntity[]> {
    return await this.profileService.findProfessorsByDiscipline(disciplineId);
  }

  @Put('professor/:id')
  async updateProfessor(
    @Param('id') profileId: number,
    @Body() updateProfileDto: UpdateProfileProfessorDto,
  ): Promise<ProfileProfessorEntity> {
    return await this.profileService.updateOneProfessor(
      profileId,
      updateProfileDto,
    );
  }

  @Delete('professor/:id')
  async removeProfessor(
    @Param('id') profileId: number,
  ): Promise<ProfileProfessorEntity[]> {
    return await this.profileService.deleteOneProfessor(profileId);
  }
}
