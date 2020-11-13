import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CathedraService } from './cathedra.service';
import { CreateCathedraDto } from './dto/create-cathedra.dto';
import { UpdateCathedraDto } from './dto/update-cathedra.dto';
import { Cathedra } from './entities/cathedra.entity';

@Controller('cathedra')
export class CathedraController {
    constructor(
        private readonly cathedraService: CathedraService,
    ) {}

    @Post()
    async create(@Body() createCathedraDto: CreateCathedraDto): Promise<Cathedra> {
        console.log(createCathedraDto)
        return await this.cathedraService.create(createCathedraDto)
    }

    @Get()
    async findAll(): Promise<Cathedra[]> {
        return await this.cathedraService.findAll()
    }

    @Get(':id')
    async findOneById(@Param('id') cathedraId: number): Promise<Cathedra> {
        return await this.cathedraService.findOneById(cathedraId)
    }

    @Put(':id')
    async update(@Param('id') cathedraId: number, @Body() updateCathedraDto: UpdateCathedraDto): Promise<Cathedra> {
        return await this.cathedraService.updateOne(cathedraId, updateCathedraDto);
    }

    @Delete(':id')
    async remove(@Param('id') cathedraId: number): Promise<Cathedra[]> {
        return await this.cathedraService.deleteOne(cathedraId);
    }
}