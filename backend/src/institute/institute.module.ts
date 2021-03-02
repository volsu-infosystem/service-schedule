import { Module } from '@nestjs/common';
import { InstituteController } from './institute.controller';
import { InstituteService } from './institute.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InstituteEntity } from './entities/institute.entity';
import { CathedraController } from './cathedra.controller';
import { CathedraEntity } from './entities/cathedra.entity';
import { CathedraService } from './cathedra.service';

@Module({
  imports: [TypeOrmModule.forFeature([InstituteEntity, CathedraEntity])],
  controllers: [InstituteController, CathedraController],
  providers: [InstituteService, CathedraService],
  exports: [CathedraService],
})
export class InstituteModule {}
