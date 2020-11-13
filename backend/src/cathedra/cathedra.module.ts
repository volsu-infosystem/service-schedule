import { Module } from '@nestjs/common';
import { CathedraService } from './cathedra.service';
import { CathedraController } from './cathedra.controller';
import { Cathedra } from './entities/cathedra.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Cathedra])],
  providers: [CathedraService],
  controllers: [CathedraController]
})
export class CathedraModule {}
