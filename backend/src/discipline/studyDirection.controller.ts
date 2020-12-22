import { Controller, Post, Body, Get, Param, Put, Delete, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { CreateStudyDirectionDto } from "./dto/create-study-direction";
import { UpdateStudyDirectionDto } from "./dto/update-study-direction.dto";
import { StudyDirectionEntity } from "./entities/studyDirection.entity";
import { StudyDirectionService } from "./studyDirection.service";

@Controller('studydirection')
@UseGuards(JwtAuthGuard)
export class StudyDirectionController {
    constructor(
        private readonly studydirectionService: StudyDirectionService,
    ) {}

    @Post()
    async create(@Body() createStudyDirectionDto: CreateStudyDirectionDto): Promise<StudyDirectionEntity> {
        return await this.studydirectionService.create(createStudyDirectionDto)
    }

    @Get()
    async findAll(): Promise<StudyDirectionEntity[]> {
        return await this.studydirectionService.findAll()
    }

    @Get(':id')
    async findOneById(@Param('id') studydirectionId: number): Promise<StudyDirectionEntity> {
        return await this.studydirectionService.findOneById(studydirectionId)
    }

    @Put(':id')
    async update(@Param('id') studydirectionId: number, @Body() updateStudyDirectionDto: UpdateStudyDirectionDto): Promise<StudyDirectionEntity> {
        return await this.studydirectionService.updateOne(studydirectionId, updateStudyDirectionDto);
    }

    @Delete(':id')
    async remove(@Param('id') studydirectionId: number): Promise<StudyDirectionEntity[]> {
        return await this.studydirectionService.deleteOne(studydirectionId);
    }
}
