import { Module } from '@nestjs/common';
import { GroupService } from './group.service';
import { GroupController } from './group.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Group } from './entities/group.entity';
import { SubGroup } from './entities/subGroup.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Group, SubGroup])],
  providers: [GroupService],
  controllers: [GroupController]
})
export class GroupModule {}
