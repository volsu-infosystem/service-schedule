import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DisciplineController } from './discipline.controller';
import { DisciplineService } from './discipline.service';
import { Discipline } from './entities/discipline.enitity';
import { DisciplineHoured } from './entities/disciplineHoured.entity';
import { StudyDirection } from './entities/studyDirection.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Discipline, DisciplineHoured, StudyDirection])],
  controllers: [DisciplineController],
  providers: [DisciplineService]
})
export class DisciplineModule {}
