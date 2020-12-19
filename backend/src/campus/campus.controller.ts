import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CampusService } from './campus.service';
import { CreateCampusDto } from './dto/create-campus.dto';
import { UpdateCampusDto } from './dto/update-campus.dto';
import { CampusEntity } from './entities/campus.entity';

@Controller('campus')
export class CampusController {
    constructor(
        private readonly campusService: CampusService,
    ) {}

    @Post()
    async create(@Body() createCampusDto: CreateCampusDto): Promise<CampusEntity> {
        console.log(createCampusDto)
        return await this.campusService.create(createCampusDto)
    }

    @Get()
    async findAll(): Promise<CampusEntity[]> {
        return await this.campusService.findAll()
    }

    @Get(':id')
    async findOneById(@Param('id') campusId: number): Promise<CampusEntity> {
        return await this.campusService.findOneById(campusId)
    }

    @Put(':id')
    async update(@Param('id') campusId: number, @Body() updateCampusDto: UpdateCampusDto): Promise<CampusEntity> {
        return await this.campusService.updateOne(campusId, updateCampusDto);
    }

    @Delete(':id')
    async remove(@Param('id') campusId: number): Promise<CampusEntity[]> {
        return await this.campusService.deleteOne(campusId);
    }
}
