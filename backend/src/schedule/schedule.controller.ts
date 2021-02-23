import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CreateScheduleDto } from './dto/create-schedule.dto';
import { ScheduleEntity } from './entities/schedule.entity';
import { LessonService } from './lesson.service';
import { LessonResponse } from './schedule.interface';
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

  @Get('/:group/:semester/')
  async getSchedule(
    @Param('group') group: string,
    @Param('semester') semester: number,
  ): Promise<LessonResponse[]> {
    return this.scheduleService.getSchedule(group, semester);
  }

  @Get('/:group')
  async getSchedulesByGroup(
    @Param('group') group: string,
  ): Promise<ScheduleEntity[]> {
    return this.scheduleService.getScheduleByGroup(group);
  }
}
