import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DisciplineController } from './discipline.controller';
import { DisciplineService } from './discipline.service';
import { Discipline } from './entities/discipline.enitity';
import { DisciplineHoured } from './entities/disciplineHoured.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Discipline, DisciplineHoured])],
  controllers: [DisciplineController],
  providers: [DisciplineService]
})
export class DisciplineModule {}
