import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { InsertCellDto } from './dto/insert-cell.dto';
import { CreateScheduleDto } from './dto/create-schedule.dto';
import { CellEntity } from './entities/cell.entity';
import { ScheduleEntity } from './entities/schedule.entity';
import { ScheduleService } from './schedule.service';
import { CellService } from './cell.service';

@Controller('schedule')
@ApiTags('schedule')
@UseGuards(JwtAuthGuard)
export class ScheduleController {
  constructor(
    private readonly scheduleService: ScheduleService,
    private readonly cellService: CellService,
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

  @Post('/cell/:id/')
  async insertCell(
    @Body() insertCellDto: InsertCellDto,
    @Param('id') cellId: number,
  ): Promise<CellEntity> {
    return this.cellService.insertCell(cellId, insertCellDto);
  }
}
