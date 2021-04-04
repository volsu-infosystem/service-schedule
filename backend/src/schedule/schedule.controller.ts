import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { InsertLessonsToCellDto } from './dto/insert-lessons-to-cell.dto';
import { CellEntity } from './entities/cell.entity';
import { ScheduleEntity } from './entities/schedule.entity';
import { ScheduleService } from './schedule.service';
import { CellService } from './cell.service';
import { AuthPayload } from 'src/auth/payload.decorator';
import { PayloadInterface } from 'src/auth/interfaces/payload.interface';

@UseGuards(JwtAuthGuard)
@Controller('schedule')
@ApiTags('schedule')
export class ScheduleController {
  constructor(
    private readonly scheduleService: ScheduleService,
    private readonly cellService: CellService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get(':semester')
  async getScheduleByJWT(
    @AuthPayload() payload: PayloadInterface,
    @Param('semester') semester: number,
  ): Promise<any> {
    console.log('test');
    return await this.scheduleService.getScheduleByProfileIdAndSemester(
      1,
      //payload.profile.id,
      semester,
    );
  }

  /* @TODO Mock ScheduleResponse Interface */
  @Get('/group/:group/:semester/')
  async getScheduleByGroupAndSemester(
    @Param('group') group: number,
    @Param('semester') semester: number,
  ): Promise<any> {
    return this.scheduleService.getScheduleByGroupAndSemester(group, semester);
  }

  @Get('group/:group')
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

  @Post(':scheduleId/lesson/')
  async insertLesson(
    @Body() createLessonDto: InsertLessonsToCellDto,
    @Param('scheduleId') scheduleId: number,
  ): Promise<CellEntity> {
    return this.cellService.insertToCell(scheduleId, createLessonDto);
  }
}
