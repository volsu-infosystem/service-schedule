import { Module } from '@nestjs/common';
import { DisciplineController } from './discipline.controller';
import { DisciplineService } from './discipline.service';

@Module({
  controllers: [DisciplineController],
  providers: [DisciplineService]
})
export class DisciplineModule {}
