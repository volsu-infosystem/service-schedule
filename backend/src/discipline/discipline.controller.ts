import { Controller, Post, Body, Get, Param, Put, Delete } from "@nestjs/common";
import { DisciplineService } from "./discipline.service";
import { CreateDisciplineDto } from "./dto/create-discipline.dto";
import { UpdateDisciplineDto } from "./dto/update-discipline.dto";
import { DisciplineEntity } from "./entities/discipline.entity";

@Controller('discipline')
export class DisciplineController {
    constructor(
        private readonly disciplineService: DisciplineService,
    ) {}

    @Post()
    async create(@Body() createDisciplineDto: CreateDisciplineDto): Promise<DisciplineEntity> {
        console.log(createDisciplineDto)
        return await this.disciplineService.create(createDisciplineDto)
    }

    @Get()
    async findAll(): Promise<DisciplineEntity[]> {
        return await this.disciplineService.findAll()
    }

    @Get(':id')
    async findOneById(@Param('id') disciplineId: number): Promise<DisciplineEntity> {
        return await this.disciplineService.findOneById(disciplineId)
    }

    @Put(':id')
    async update(@Param('id') disciplineId: number, @Body() updateDisciplineDto: UpdateDisciplineDto): Promise<DisciplineEntity> {
        return await this.disciplineService.updateOne(disciplineId, updateDisciplineDto);
    }

    @Delete(':id')
    async remove(@Param('id') disciplineId: number): Promise<DisciplineEntity[]> {
        return await this.disciplineService.deleteOne(disciplineId);
    }
}
