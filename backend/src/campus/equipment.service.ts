import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeepPartial } from 'typeorm';
import { CreateEquipmentDto } from './dto/create-equipment.dto';
import { UpdateEquipmentDto } from './dto/update-equipment.dto';
import { EquipmentEntity } from './entities/equipment.entity';
import { EquipmentNotFoundException } from './exceptions/equipment.exceptions';

@Injectable()
export class EquipmentService {
    constructor(
        @InjectRepository(EquipmentEntity)
        private readonly equipmentRepository: Repository<EquipmentEntity>
    ) {}

    async create(equipment: CreateEquipmentDto): Promise<EquipmentEntity> {
        const newEquipment = this.equipmentRepository.create(equipment)
        return await this.equipmentRepository.save(newEquipment)
    }

    async findAll(): Promise<EquipmentEntity[]> {
        return await this.equipmentRepository.find();
    }

    async findOneById(equipmentId: number): Promise<EquipmentEntity> {
        return await this.equipmentRepository.findOne({id: equipmentId})
    }

    async updateOne(equipmentId: number, updateEquipment: DeepPartial<UpdateEquipmentDto>): Promise<EquipmentEntity> {
        await this.equipmentRepository.update({id: equipmentId}, updateEquipment);
        const updatedEquipment = await this.equipmentRepository.findOne(equipmentId);
        if (updatedEquipment) {
            return updatedEquipment
        } 
        throw new EquipmentNotFoundException(equipmentId);
    }

    async deleteOne(equipmentId: number): Promise<EquipmentEntity[]> {
        const equipmentToRemove = await this.equipmentRepository.find({id: equipmentId});
        return await this.equipmentRepository.remove(equipmentToRemove);
    }
}
