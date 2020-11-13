import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository, DeepPartial } from "typeorm";
import { CreateStudyDirectionDto } from "./dto/create-study-direction";
import { UpdateStudyDirectionDto } from "./dto/update-study-direction.dto";
import { StudyDirection } from "./entities/studyDirection.entity";
import { StudyDirectionNotFoundException } from "./exceptions/studyDirection.exceptions";


@Injectable()
export class StudyDirectionService {
    constructor(
        @InjectRepository(StudyDirection)
        private readonly studydirectionRepository: Repository<StudyDirection>
    ) {}

    async create(studydirection: CreateStudyDirectionDto): Promise<StudyDirection> {
        const newStudyDirection = this.studydirectionRepository.create(studydirection)
        return await this.studydirectionRepository.save(newStudyDirection)
    }

    async findAll(): Promise<StudyDirection[]> {
        return await this.studydirectionRepository.find();
    }

    async findOneById(studydirectionId: number): Promise<StudyDirection> {
        return await this.studydirectionRepository.findOne({id: studydirectionId})
    }

    async updateOne(studydirectionId: number, updateStudyDirection: DeepPartial<UpdateStudyDirectionDto>): Promise<StudyDirection> {
        await this.studydirectionRepository.update({id: studydirectionId}, updateStudyDirection);
        const updatedStudyDirection = await this.studydirectionRepository.findOne(studydirectionId);
        if (updatedStudyDirection) {
            return updatedStudyDirection
        } 
        throw new StudyDirectionNotFoundException(studydirectionId);
    }

    async deleteOne(studydirectionId: number): Promise<StudyDirection[]> {
        const studydirectionToRemove = await this.studydirectionRepository.find({id: studydirectionId});
        return await this.studydirectionRepository.remove(studydirectionToRemove);
    }
}
