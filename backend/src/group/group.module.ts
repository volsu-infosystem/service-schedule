import { Module } from '@nestjs/common';
import { GroupService } from './group.service';
import { GroupController } from './group.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Group } from './entities/group.entity';
import { SubGroup } from './entities/subGroup.entity';
import { SubGroupService } from './subGroup.service';
import { SubGroupController } from './subGroup.controller';


@Module({
  imports: [TypeOrmModule.forFeature([Group, SubGroup])],
  providers: [GroupService, SubGroupService],
  controllers: [GroupController, SubGroupController]
})
export class GroupModule {}
