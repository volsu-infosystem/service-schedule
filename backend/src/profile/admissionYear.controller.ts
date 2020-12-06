import { Controller, Post, Body, Get, Param, Put, Delete } from "@nestjs/common";
import { AdmissionYearService } from "./admissionYear.service";
import { CreateAdmissionYearDto } from "./dto/create-admission-year.dto";
import { UpdateAdmissionYearDto } from "./dto/update-admission-year.dto";
import { AdmissionYearEntity } from "./entities/admissionYear.entity";

@Controller('admissionYear')
export class AdmissionYearController {
    constructor(
        private readonly admissionYearService: AdmissionYearService,
    ) {}

    @Post()
    async create(@Body() createAdmissionYearDto: CreateAdmissionYearDto): Promise<AdmissionYearEntity> {
        console.log(createAdmissionYearDto)
        return await this.admissionYearService.create(createAdmissionYearDto)
    }

    @Get()
    async findAll(): Promise<AdmissionYearEntity[]> {
        return await this.admissionYearService.findAll()
    }

    @Get(':id')
    async findOneById(@Param('id') admissionYearId: number): Promise<AdmissionYearEntity> {
        return await this.admissionYearService.findOneById(admissionYearId)
    }

    @Put(':id')
    async update(@Param('id') admissionYearId: number, @Body() updateAdmissionYearDto: UpdateAdmissionYearDto): Promise<AdmissionYearEntity> {
        return await this.admissionYearService.updateOne(admissionYearId, updateAdmissionYearDto);
    }

    @Delete(':id')
    async remove(@Param('id') admissionYearId: number): Promise<AdmissionYearEntity[]> {
        return await this.admissionYearService.deleteOne(admissionYearId);
    }
}
