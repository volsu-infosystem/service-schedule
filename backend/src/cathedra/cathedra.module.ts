import { Module } from '@nestjs/common';
import { CathedraService } from './cathedra.service';
import { CathedraController } from './cathedra.controller';
import { CathedraEntity } from './entities/cathedra.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([CathedraEntity])],
  providers: [CathedraService],
  controllers: [CathedraController]
})
export class CathedraModule {}
