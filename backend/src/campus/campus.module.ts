import { Module } from '@nestjs/common';
import { CampusController } from './campus.controller';
import { CampusService } from './campus.service';

@Module({
  controllers: [CampusController],
  providers: [CampusService]
})
export class CampusModule {}
