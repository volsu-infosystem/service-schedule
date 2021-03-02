import { forwardRef, Module } from '@nestjs/common';
import { GroupService } from './group.service';
import { GroupController } from './group.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GroupEntity } from './entities/group.entity';
import { SubGroupEntity } from './entities/subGroup.entity';
import { SubGroupService } from './subGroup.service';
import { SubGroupController } from './subGroup.controller';
import { ScheduleModule } from 'src/schedule/schedule.module';
import { InstituteModule } from 'src/institute/institute.module';
import { DisciplineModule } from 'src/discipline/discipline.module';
import { ProfileModule } from 'src/profile/profile.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([GroupEntity, SubGroupEntity]),
    forwardRef(() => ScheduleModule),
    InstituteModule,
    DisciplineModule,
    ProfileModule,
  ],
  providers: [GroupService, SubGroupService],
  controllers: [GroupController, SubGroupController],
  exports: [GroupService, SubGroupService],
})
export class GroupModule {}
