import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeepPartial } from 'typeorm';
import { CreateCathedraDto } from './dto/create-cathedra.dto';
import { UpdateCathedraDto } from './dto/update-cathedra.dto';
import { CathedraEntity } from './entities/cathedra.entity';
import { CathedraNotFoundException } from './exceptions/cathedra.exceptions'

@Injectable()
export class CathedraService {
    constructor(
        @InjectRepository(CathedraEntity)
        private readonly cathedraRepository: Repository<CathedraEntity>
    ) {}

    async create(cathedra: CreateCathedraDto): Promise<CathedraEntity> {
        const newCathedra = this.cathedraRepository.create(cathedra)
        return await this.cathedraRepository.save(newCathedra)
    }

    async findAll(): Promise<CathedraEntity[]> {
        return await this.cathedraRepository.find();
    }

    async findOneById(cathedraId: number): Promise<CathedraEntity> {
        return await this.cathedraRepository.findOne({id: cathedraId})
    }

    async updateOne(cathedraId: number, updateCathedra: DeepPartial<UpdateCathedraDto>): Promise<CathedraEntity> {
        await this.cathedraRepository.update({id: cathedraId}, updateCathedra);
        const updatedCathedra = await this.cathedraRepository.findOne(cathedraId);
        if (updatedCathedra) {
            return updatedCathedra
        } 
        throw new CathedraNotFoundException(cathedraId);
    }

    async deleteOne(cathedraId: number): Promise<CathedraEntity[]> {
        const cathedraToRemove = await this.cathedraRepository.find({id: cathedraId});
        return await this.cathedraRepository.remove(cathedraToRemove);
    }
}
