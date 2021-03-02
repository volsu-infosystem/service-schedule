import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CreateLessonDto } from './dto/create-lesson.dto';
import { CreateScheduleDto } from './dto/create-schedule.dto';
import { UpdateLessonDto } from './dto/update-lesson.dto';
import { LessonEntity } from './entities/lesson.entity';
import { ScheduleEntity } from './entities/schedule.entity';
import { LessonService } from './lesson.service';
import { ScheduleService } from './schedule.service';

@Controller('schedule')
@ApiTags('schedule')
@UseGuards(JwtAuthGuard)
export class ScheduleController {
  constructor(
    private readonly scheduleService: ScheduleService,
    private readonly lessonService: LessonService,
  ) {}

  @Post()
  async create(
    @Body() createScheduleDto: CreateScheduleDto,
  ): Promise<ScheduleEntity> {
    return await this.scheduleService.create(createScheduleDto);
  }

  /* @TODO Mock ScheduleResponse Interface */
  @Get(':group/:semester/')
  async getScheduleByGroupAndSemester(
    @Param('group') group: number,
    @Param('semester') semester: number,
  ): Promise<any> {
    return this.scheduleService.getScheduleByGroupAndSemester(group, semester);
  }

  @Get('/:group')
  async getSchedulesByGroup(
    @Param('group') group: string,
  ): Promise<ScheduleEntity[]> {
    return this.scheduleService.getScheduleByGroup(group);
  }

  /* @TODO Mock ScheduleResponse Interface */
  @Get('/institute/:institute/:semester/')
  async getScheduleByInstituteAndSemester(
    @Param('institute') institute: number,
    @Param('semester') semester: number,
  ): Promise<any> {
    return this.scheduleService.getScheduleByInstituteAndSemester(
      institute,
      semester,
    );
  }

  @Post('/lesson')
  async createLesson(
    @Body() createLessonDto: CreateLessonDto,
  ): Promise<LessonEntity> {
    return this.lessonService.create(createLessonDto);
  }

  @Put('/lesson/:id')
  async updateLesson(
    @Param('id') lessonId: number,
    @Body() updateLessonDto: UpdateLessonDto,
  ): Promise<LessonEntity> {
    return this.lessonService.updateOne(lessonId, updateLessonDto);
  }
}
