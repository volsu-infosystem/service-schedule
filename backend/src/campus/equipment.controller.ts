import { Controller, Post, Body, Get, Param, Put, Delete, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { CreateEquipmentDto } from "./dto/create-equipment.dto";
import { UpdateEquipmentDto } from "./dto/update-equipment.dto";
import { EquipmentEntity } from "./entities/equipment.entity";
import { EquipmentService } from "./equipment.service";

@Controller('equipment')
@UseGuards(JwtAuthGuard)
export class EquipmentController {
    constructor(
        private readonly equipmentService: EquipmentService,
    ) {}

    @Post()
    async create(@Body() createEquipmentDto: CreateEquipmentDto): Promise<EquipmentEntity> {
        return await this.equipmentService.create(createEquipmentDto)
    }

    @Get()
    async findAll(): Promise<EquipmentEntity[]> {
        return await this.equipmentService.findAll()
    }

    @Get(':id')
    async findOneById(@Param('id') equipmentId: number): Promise<EquipmentEntity> {
        return await this.equipmentService.findOneById(equipmentId)
    }

    @Put(':id')
    async update(@Param('id') equipmentId: number, @Body() updateEquipmentDto: UpdateEquipmentDto): Promise<EquipmentEntity> {
        return await this.equipmentService.updateOne(equipmentId, updateEquipmentDto);
    }

    @Delete(':id')
    async remove(@Param('id') equipmentId: number): Promise<EquipmentEntity[]> {
        return await this.equipmentService.deleteOne(equipmentId);
    }
}