import { Module } from '@nestjs/common';
import { ScheduleService } from './schedule.service';
import { ScheduleController } from './schedule.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScheduleEntity } from './entities/schedule.entity';
import { LessonEntity } from './entities/lesson.entity';
import { LessonService } from './lesson.service';
import { ProfileModule } from 'src/profile/profile.module';
import { DisciplineModule } from 'src/discipline/discipline.module';
import { CampusModule } from 'src/campus/campus.module';
import { GroupModule } from 'src/group/group.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ScheduleEntity, LessonEntity]),
    ProfileModule,
    DisciplineModule,
    CampusModule,
    GroupModule,
  ],
  providers: [ScheduleService, LessonService],
  controllers: [ScheduleController],
  exports: [ScheduleService],
})
export class ScheduleModule {}
