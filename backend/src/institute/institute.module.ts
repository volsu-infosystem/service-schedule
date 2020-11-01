import { Module } from '@nestjs/common';
import { InstituteController } from './institute.controller';
import { InstituteService } from './institute.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cathedra } from './entities/cathedra.entity';
import { Institute } from './entities/institute.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Institute, Cathedra])],
  controllers: [InstituteController],
  providers: [InstituteService]
})
export class InstituteModule {}
