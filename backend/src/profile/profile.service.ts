import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DeepPartial, Repository } from "typeorm";
import { CreateProfileProfessorDto } from "./dto/create-profile-professor.dto";
import { CreateProfileStudentDto } from "./dto/create-profile-student.dto";
import { ProfileProfessorEntity } from "./entities/profileProfessor.entity";
import { ProfileStudentEntity } from "./entities/profileStudent.entity";
import { profileTypeEnum } from "./enums/profileType.enum";
import { ProfileInvalidDtoException, ProfileNotFoundException } from "./exceptions/profile.exceptions";
import { CreateProfileDto, ProfileEntity, UpdateProfileDto } from "./interfaces/profile.interface";


@Injectable()
export class ProfileService {
    constructor(
        @InjectRepository(ProfileStudentEntity)
        private readonly studentRepository: Repository<ProfileStudentEntity>,

        @InjectRepository(ProfileProfessorEntity)
        private readonly professorRepository: Repository<ProfileProfessorEntity>
    ) {}
    
    async create(profile: CreateProfileDto): Promise<ProfileEntity> {

        let profileRepository;

        if (profile instanceof CreateProfileStudentDto) {
            profileRepository = this.studentRepository;
        } else if (profile instanceof CreateProfileProfessorDto) {
            profileRepository = this.professorRepository;
        } else throw new ProfileInvalidDtoException()

        const newProfile = profileRepository.create(profile)

        return await profileRepository.save(newProfile)
    }

    async findOneById(profileId: number, type: profileTypeEnum ): Promise<ProfileEntity> {
        
        let profileRepository;

        if (type === profileTypeEnum.Student) {
            profileRepository = this.studentRepository;
        } else if (type === profileTypeEnum.Professor) {
            profileRepository = this.professorRepository;
        } else throw new ProfileInvalidDtoException()
        
        return await profileRepository.findOne({id: profileId})
    }

    async updateOne(profileId: number, updateProfile: DeepPartial<UpdateProfileDto>, type: profileTypeEnum): Promise<ProfileEntity> {
        
        let profileRepository;

        //
        // WARNING! To Do: Write normal DeepPartial verification
        // This service needed hard refactoring
        //

        if (type === profileTypeEnum.Student) {
            profileRepository = this.studentRepository;
        } else if (type === profileTypeEnum.Professor) {
            profileRepository = this.professorRepository;
        } else throw new ProfileInvalidDtoException()


        await profileRepository.update({id: profileId}, updateProfile);

        const updatedProfile = await profileRepository.findOne(profileId);
        if (updatedProfile) {
            return updatedProfile
        } 
        throw new ProfileNotFoundException(profileId);
    }

    async deleteOne(profileId: number, type: profileTypeEnum): Promise<ProfileEntity[]> {

        let profileRepository;

        if (type === profileTypeEnum.Student) {
            profileRepository = this.studentRepository;
        } else if (type === profileTypeEnum.Professor) {
            profileRepository = this.professorRepository;
        } else throw new ProfileInvalidDtoException()

        const profileToRemove = await profileRepository.find({id: profileId});
        return await profileRepository.remove(profileToRemove);
    }

}