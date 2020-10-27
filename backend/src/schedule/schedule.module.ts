import { Module } from '@nestjs/common';
import { ScheduleService } from './schedule.service';
import { ScheduleController } from './schedule.controller';

@Module({
  providers: [ScheduleService],
  controllers: [ScheduleController]
})
export class ScheduleModule {}
