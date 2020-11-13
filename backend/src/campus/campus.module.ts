import { Module } from '@nestjs/common';
import { CampusController } from './campus.controller';
import { CampusService } from './campus.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Campus } from './entities/campus.entity';
import { Equipment } from './entities/equipment.entity';
import { Room } from './entities/room.entity';
import { EquipmentService } from './equipment.service';
import { EquipmentController } from './equipment.controller';
import { RoomController } from './room.controller';
import { RoomService } from './room.service';

@Module({
  imports: [TypeOrmModule.forFeature([Campus, Room, Equipment])],
  controllers: [CampusController, EquipmentController, RoomController],
  providers: [CampusService, EquipmentService, RoomService]
})
export class CampusModule {}
