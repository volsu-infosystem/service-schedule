import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DisciplineController } from './discipline.controller';
import { DisciplineService } from './discipline.service';
import { DisciplineHouredController } from './disciplineHoured.controller';
import { DisciplineHouredService } from './disciplineHoured.service';
import { DisciplineEntity } from './entities/discipline.entity';
import { DisciplineHouredEntity } from './entities/disciplineHoured.entity';
import { StudyDirectionEntity } from './entities/studyDirection.entity';
import { StudyDirectionController } from './studyDirection.controller';
import { StudyDirectionService } from './studyDirection.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      DisciplineEntity,
      DisciplineHouredEntity,
      StudyDirectionEntity,
    ]),
  ],
  controllers: [
    DisciplineController,
    DisciplineHouredController,
    StudyDirectionController,
  ],
  providers: [
    DisciplineService,
    DisciplineHouredService,
    StudyDirectionService,
  ],
  exports: [DisciplineService],
})
export class DisciplineModule {}
