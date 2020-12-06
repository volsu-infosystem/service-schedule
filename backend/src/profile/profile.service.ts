import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeepPartial } from 'typeorm';
import { ProfileStudentEntity } from './entities/profileStudent.entity';
import { ProfileProfessorEntity } from './entities/profileProfessor.entity';
import { CreateProfileStudentDto } from './dto/create-profile-student.dto';
import { CreateProfileProfessorDto } from './dto/create-profile-professor.dto';

@Injectable()
export class ProfileService {}

// @Injectable()
// export class ProfileService {
//     constructor(
//         @InjectRepository(ProfileStudent)
//         private readonly studentRepository: Repository<ProfileStudent>,

//         @InjectRepository(ProfileProfessor)
//         private readonly professorRepository: Repository<ProfileProfessor>
//     ) {}

//     async create(profile: CreateProfileStudentDto | CreateProfileProfessorDto): Promise<ProfileStudent | ProfileProfessor> {
//         const newProfile = this.profileRepository.create(profile)
//         return await this.profileRepository.save(newProfile)
//     }

//     async findAll(): Promise<Profile[]> {
//         return await this.profileRepository.find();
//     }

//     async findOneById(profileId: number): Promise<Profile> {
//         return await this.profileRepository.findOne({id: profileId})
//     }

//     async updateOne(profileId: number, updateProfile: DeepPartial<UpdateProfileDto>): Promise<Profile> {
//         await this.profileRepository.update({id: profileId}, updateProfile);
//         const updatedProfile = await this.profileRepository.findOne(profileId);
//         if (updatedProfile) {
//             return updatedProfile
//         } 
//         throw new ProfileNotFoundException(profileId);
//     }

//     async deleteOne(profileId: number): Promise<Profile[]> {
//         const profileToRemove = await this.profileRepository.find({id: profileId});
//         return await this.profileRepository.remove(profileToRemove);
//     }
// }
