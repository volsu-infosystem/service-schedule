import { Controller, Post, Body, Get, Param, Put, Delete, UseGuards } from "@nestjs/common";
import { AdmissionYearService } from "./admissionYear.service";
import { CreateAdmissionYearDto } from "./dto/create-admission-year.dto";
import { UpdateAdmissionYearDto } from "./dto/update-admission-year.dto";
import { AdmissionYearEntity } from "./entities/admissionYear.entity";
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('admissionYear')
@UseGuards(JwtAuthGuard)
export class AdmissionYearController {
    constructor(
        private readonly admissionYearService: AdmissionYearService,
    ) {}

    @UseGuards(JwtAuthGuard)
    @Post()
    async create(@Body() createAdmissionYearDto: CreateAdmissionYearDto): Promise<AdmissionYearEntity> {
        return await this.admissionYearService.create(createAdmissionYearDto)
    }

    @UseGuards(JwtAuthGuard)
    @Get()
    async findAll(): Promise<AdmissionYearEntity[]> {
        return await this.admissionYearService.findAll()
    }

    @UseGuards(JwtAuthGuard)
    @Get(':id')
    async findOneById(@Param('id') admissionYearId: number): Promise<AdmissionYearEntity> {
        return await this.admissionYearService.findOneById(admissionYearId)
    }

    @UseGuards(JwtAuthGuard)
    @Put(':id')
    async update(@Param('id') admissionYearId: number, @Body() updateAdmissionYearDto: UpdateAdmissionYearDto): Promise<AdmissionYearEntity> {
        return await this.admissionYearService.updateOne(admissionYearId, updateAdmissionYearDto);
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    async remove(@Param('id') admissionYearId: number): Promise<AdmissionYearEntity[]> {
        return await this.admissionYearService.deleteOne(admissionYearId);
    }
}
