import { Module } from '@nestjs/common';
import { GroupService } from './group.service';
import { GroupController } from './group.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GroupEntity } from './entities/group.entity';
import { SubGroupEntity } from './entities/subGroup.entity';
import { SubGroupService } from './subGroup.service';
import { SubGroupController } from './subGroup.controller';

@Module({
  imports: [TypeOrmModule.forFeature([GroupEntity, SubGroupEntity])],
  providers: [GroupService, SubGroupService],
  controllers: [GroupController, SubGroupController],
})
export class GroupModule {}
