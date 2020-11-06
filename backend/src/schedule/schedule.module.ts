import { Module } from '@nestjs/common';
import { ScheduleService } from './schedule.service';
import { ScheduleController } from './schedule.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Schedule } from './entities/schedule.entity';
import { Cell } from './entities/cell.entity';
import { SubCell } from './entities/subCell.entity';
import { Lesson } from './entities/lesson.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Schedule, Cell, SubCell, Lesson])],
  providers: [ScheduleService],
  controllers: [ScheduleController]
})
export class ScheduleModule {}
