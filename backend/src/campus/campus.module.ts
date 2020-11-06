import { Module } from '@nestjs/common';
import { CampusController } from './campus.controller';
import { CampusService } from './campus.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Campus } from './entities/campus.entity';
import { Equipment } from './entities/equipment.entity';
import { Room } from './entities/room.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Campus, Room, Equipment])],
  controllers: [CampusController],
  providers: [CampusService]
})
export class CampusModule {}
