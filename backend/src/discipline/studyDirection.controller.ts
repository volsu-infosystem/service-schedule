import { Controller, Post, Body, Get, Param, Put, Delete } from "@nestjs/common";
import { CreateStudyDirectionDto } from "./dto/create-study-direction";
import { UpdateStudyDirectionDto } from "./dto/update-study-direction.dto";
import { StudyDirection } from "./entities/studyDirection.entity";
import { StudyDirectionService } from "./studyDirection.service";

@Controller('studydirection')
export class StudyDirectionController {
    constructor(
        private readonly studydirectionService: StudyDirectionService,
    ) {}

    @Post()
    async create(@Body() createStudyDirectionDto: CreateStudyDirectionDto): Promise<StudyDirection> {
        console.log(createStudyDirectionDto)
        return await this.studydirectionService.create(createStudyDirectionDto)
    }

    @Get()
    async findAll(): Promise<StudyDirection[]> {
        return await this.studydirectionService.findAll()
    }

    @Get(':id')
    async findOneById(@Param('id') studydirectionId: number): Promise<StudyDirection> {
        return await this.studydirectionService.findOneById(studydirectionId)
    }

    @Put(':id')
    async update(@Param('id') studydirectionId: number, @Body() updateStudyDirectionDto: UpdateStudyDirectionDto): Promise<StudyDirection> {
        return await this.studydirectionService.updateOne(studydirectionId, updateStudyDirectionDto);
    }

    @Delete(':id')
    async remove(@Param('id') studydirectionId: number): Promise<StudyDirection[]> {
        return await this.studydirectionService.deleteOne(studydirectionId);
    }
}
