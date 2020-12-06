import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository, DeepPartial } from "typeorm";
import { CreateDisciplineHouredDto } from "./dto/create-discipline-houred";
import { UpdateDisciplineHouredDto } from "./dto/update-discipline-houred.dto";
import { DisciplineHouredEntity } from "./entities/disciplineHoured.entity";
import { DisciplineHouredNotFoundException } from "./exceptions/disciplineHoured.exceptions";

@Injectable()
export class DisciplineHouredService {
    constructor(
        @InjectRepository(DisciplineHouredEntity)
        private readonly disciplinehouredRepository: Repository<DisciplineHouredEntity>
    ) {}

    async create(disciplinehoured: CreateDisciplineHouredDto): Promise<DisciplineHouredEntity> {
        const newDisciplineHoured = this.disciplinehouredRepository.create(disciplinehoured)
        return await this.disciplinehouredRepository.save(newDisciplineHoured)
    }

    async findAll(): Promise<DisciplineHouredEntity[]> {
        return await this.disciplinehouredRepository.find();
    }

    async findOneById(disciplinehouredId: number): Promise<DisciplineHouredEntity> {
        return await this.disciplinehouredRepository.findOne({id: disciplinehouredId})
    }

    async updateOne(disciplinehouredId: number, updateDisciplineHoured: DeepPartial<UpdateDisciplineHouredDto>): Promise<DisciplineHouredEntity> {
        await this.disciplinehouredRepository.update({id: disciplinehouredId}, updateDisciplineHoured);
        const updatedDisciplineHoured = await this.disciplinehouredRepository.findOne(disciplinehouredId);
        if (updatedDisciplineHoured) {
            return updatedDisciplineHoured
        } 
        throw new DisciplineHouredNotFoundException(disciplinehouredId);
    }

    async deleteOne(disciplinehouredId: number): Promise<DisciplineHouredEntity[]> {
        const disciplinehouredToRemove = await this.disciplinehouredRepository.find({id: disciplinehouredId});
        return await this.disciplinehouredRepository.remove(disciplinehouredToRemove);
    }
}
