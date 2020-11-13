import { Controller, Post, Body, Get, Param, Put, Delete } from "@nestjs/common";
import { CreateEquipmentDto } from "./dto/create-equipment.dto";
import { UpdateEquipmentDto } from "./dto/update-equipment.dto";
import { Equipment } from "./entities/equipment.entity";
import { EquipmentService } from "./equipment.service";

@Controller('equipment')
export class EquipmentController {
    constructor(
        private readonly equipmentService: EquipmentService,
    ) {}

    @Post()
    async create(@Body() createEquipmentDto: CreateEquipmentDto): Promise<Equipment> {
        console.log(createEquipmentDto)
        return await this.equipmentService.create(createEquipmentDto)
    }

    @Get()
    async findAll(): Promise<Equipment[]> {
        return await this.equipmentService.findAll()
    }

    @Get(':id')
    async findOneById(@Param('id') equipmentId: number): Promise<Equipment> {
        return await this.equipmentService.findOneById(equipmentId)
    }

    @Put(':id')
    async update(@Param('id') equipmentId: number, @Body() updateEquipmentDto: UpdateEquipmentDto): Promise<Equipment> {
        return await this.equipmentService.updateOne(equipmentId, updateEquipmentDto);
    }

    @Delete(':id')
    async remove(@Param('id') equipmentId: number): Promise<Equipment[]> {
        return await this.equipmentService.deleteOne(equipmentId);
    }
}