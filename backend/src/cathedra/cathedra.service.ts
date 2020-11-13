import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeepPartial } from 'typeorm';
import { CreateCathedraDto } from './dto/create-cathedra.dto';
import { UpdateCathedraDto } from './dto/update-cathedra.dto';
import { Cathedra } from './entities/cathedra.entity';
import { CathedraNotFoundException } from './exceptions/cathedra.exceptions'

@Injectable()
export class CathedraService {
    constructor(
        @InjectRepository(Cathedra)
        private readonly cathedraRepository: Repository<Cathedra>
    ) {}

    async create(cathedra: CreateCathedraDto): Promise<Cathedra> {
        const newCathedra = this.cathedraRepository.create(cathedra)
        return await this.cathedraRepository.save(newCathedra)
    }

    async findAll(): Promise<Cathedra[]> {
        return await this.cathedraRepository.find();
    }

    async findOneById(cathedraId: number): Promise<Cathedra> {
        return await this.cathedraRepository.findOne({id: cathedraId})
    }

    async updateOne(cathedraId: number, updateCathedra: DeepPartial<UpdateCathedraDto>): Promise<Cathedra> {
        await this.cathedraRepository.update({id: cathedraId}, updateCathedra);
        const updatedCathedra = await this.cathedraRepository.findOne(cathedraId);
        if (updatedCathedra) {
            return updatedCathedra
        } 
        throw new CathedraNotFoundException(cathedraId);
    }

    async deleteOne(cathedraId: number): Promise<Cathedra[]> {
        const cathedraToRemove = await this.cathedraRepository.find({id: cathedraId});
        return await this.cathedraRepository.remove(cathedraToRemove);
    }
}
