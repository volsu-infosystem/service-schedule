import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UserEntity } from "src/user/entities/user.entity";
import { DeepPartial, Repository } from "typeorm";
import { ProfileProfessorEntity } from "./entities/profileProfessor.entity";
import { ProfileStudentEntity } from "./entities/profileStudent.entity";
import { profileTypeEnum } from "./enums/profileType.enum";
import { ProfileByEmailNotFoundException, ProfileInvalidDtoException, ProfileInvalidTypeException, ProfileNotFoundException } from "./exceptions/profile.exceptions";
import { CreateProfileDto, ProfileEntity, UpdateProfileDto } from "./interfaces/profile.interface";


@Injectable()
export class ProfileService {
    constructor(
        @InjectRepository(ProfileStudentEntity)
        private readonly studentRepository: Repository<ProfileStudentEntity>,

        @InjectRepository(ProfileProfessorEntity)
        private readonly professorRepository: Repository<ProfileProfessorEntity>
    ) {}
    
    async create(profile: CreateProfileDto, type: profileTypeEnum): Promise<ProfileEntity> {

        let profileRepository;

        if (type === profileTypeEnum.Student) {
            profileRepository = this.studentRepository;
        } else if (type === profileTypeEnum.Professor) {
            profileRepository = this.professorRepository;
        } else throw new ProfileInvalidDtoException()

        const newProfile = profileRepository.create(profile)

        return await profileRepository.save(newProfile)
    }

    async findAll(type: profileTypeEnum | undefined): Promise<ProfileEntity[]> {
        
        let res = [];

        if (type === profileTypeEnum.Student) {
            const students = await this.studentRepository.find();
            res = res.concat(students);
        } else if (type === profileTypeEnum.Professor) {
            const professors = await this.professorRepository.find();
            res = res.concat(professors)
        } else {
            const students = await this.studentRepository.find();
            const professors = await this.professorRepository.find();
            res = res.concat(students, professors)
        }
        
        return res;
    }

    async findOneById(profileId: number, type: profileTypeEnum | undefined): Promise<ProfileEntity> {
        
        let profileRepository;

        if (type === profileTypeEnum.Student) {
            profileRepository = this.studentRepository;
        } else if (type === profileTypeEnum.Professor) {
            profileRepository = this.professorRepository;
        } else throw new ProfileInvalidDtoException()
        
        return await profileRepository.findOne({id: profileId})
    }

    async findOneByEmail(userEmail: string): Promise<ProfileEntity> {
        let result;
        
        const findByStudents = await this.studentRepository.findOne({ where: { email: userEmail}})
        
        if (findByStudents) {  
            result = findByStudents
        } else {
            const findByProfessors = await this.professorRepository.findOne({ where: { email: userEmail}}) 
            result = findByProfessors
        }

        if (result) {
            return result
        } else throw new ProfileByEmailNotFoundException(userEmail);
    }

    async updateOne(profileId: number, updateProfile: DeepPartial<UpdateProfileDto>, type: profileTypeEnum | undefined): Promise<ProfileEntity> {
        
        let profileRepository;

        //
        // WARNING! To Do: Write normal DeepPartial verification
        // This service needed hard refactoring
        //

        if (type === profileTypeEnum.Student) {
            profileRepository = this.studentRepository;
        } else if (type === profileTypeEnum.Professor) {
            profileRepository = this.professorRepository;
        } else throw new ProfileInvalidTypeException()


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
        } else throw new ProfileInvalidTypeException()

        const profileToRemove = await profileRepository.find({id: profileId});
        return await profileRepository.remove(profileToRemove);
    }

    async linkToUser(user: UserEntity, profileId: number, profileType: profileTypeEnum): Promise<ProfileEntity> {

        const updateData = {
            user: user
        }

        return await this.updateOne(profileId, updateData, profileType)
    }

}