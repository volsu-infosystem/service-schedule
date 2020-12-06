import { Module } from '@nestjs/common';
import { InstituteController } from './institute.controller';
import { InstituteService } from './institute.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InstituteEntity } from './entities/institute.entity';

@Module({
  imports: [TypeOrmModule.forFeature([InstituteEntity])],
  controllers: [InstituteController],
  providers: [InstituteService]
})
export class InstituteModule {}
