import { Module } from '@nestjs/common';
import { ScheduleService } from './schedule.service';
import { ScheduleController } from './schedule.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScheduleEntity } from './entities/schedule.entity';
import { CellEntity } from './entities/cell.entity';
import { SubCellEntity } from './entities/subCell.entity';
import { LessonEntity } from './entities/lesson.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ScheduleEntity,
      CellEntity,
      SubCellEntity,
      LessonEntity,
    ]),
  ],
  providers: [ScheduleService],
  controllers: [ScheduleController],
})
export class ScheduleModule {}
