import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DisciplineController } from './discipline.controller';
import { DisciplineService } from './discipline.service';
import { DisciplineHouredController } from './disciplineHoured.controller';
import { DisciplineHouredService } from './disciplineHoured.service';
import { Discipline } from './entities/discipline.entity';
import { DisciplineHoured } from './entities/disciplineHoured.entity';
import { StudyDirection } from './entities/studyDirection.entity';
import { StudyDirectionController } from './studyDirection.controller';
import { StudyDirectionService } from './studyDirection.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Discipline, DisciplineHoured, StudyDirection]),
  ],
  controllers: [DisciplineController, DisciplineHouredController, StudyDirectionController],
  providers: [DisciplineService, DisciplineHouredService, StudyDirectionService],
})
export class DisciplineModule {}
