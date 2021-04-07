import { Module } from '@nestjs/common';
import { GroupService } from './group.service';
import { GroupController } from './group.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GroupEntity } from './entities/group.entity';
import { SubGroupEntity } from './entities/subGroup.entity';
import { SubGroupService } from './subGroup.service';
import { SubGroupController } from './subGroup.controller';
import { InstituteModule } from 'src/institute/institute.module';
import { DisciplineModule } from 'src/discipline/discipline.module';
import { ProfileModule } from 'src/profile/profile.module';
import { forwardRef } from '@nestjs/common';
import { ScheduleModule } from 'src/schedule/schedule.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([GroupEntity, SubGroupEntity]),
    InstituteModule,
    DisciplineModule,
    forwardRef(() => ProfileModule),
    forwardRef(() => ScheduleModule),
  ],
  providers: [GroupService, SubGroupService],
  controllers: [GroupController, SubGroupController],
  exports: [GroupService, SubGroupService],
})
export class GroupModule {}
