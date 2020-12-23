import { CreateProfileProfessorDto } from '../dto/create-profile-professor.dto';
import { CreateProfileStudentDto } from '../dto/create-profile-student.dto';
import { UpdateProfileProfessorDto } from '../dto/update-profile-professor.dto';
import { UpdateProfileStudentDto } from '../dto/update-profile-student.dto';
import { ProfileProfessorEntity } from '../entities/profileProfessor.entity';
import { ProfileStudentEntity } from '../entities/profileStudent.entity';

export type CreateProfileDto =
  | CreateProfileStudentDto
  | CreateProfileProfessorDto;
export type UpdateProfileDto =
  | UpdateProfileStudentDto
  | UpdateProfileProfessorDto;
export type ProfileEntity = ProfileStudentEntity | ProfileProfessorEntity;
