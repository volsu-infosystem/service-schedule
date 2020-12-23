import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CreateInstituteDto } from './dto/create-institute.dto';
import { UpdateInstituteDto } from './dto/update-institute.dto';
import { InstituteEntity } from './entities/institute.entity';
import { InstituteService } from './institute.service';

@Controller('institute')
@UseGuards(JwtAuthGuard)
export class InstituteController {
  constructor(private readonly instituteService: InstituteService) {}

  @Post()
  async create(
    @Body() createInstituteDto: CreateInstituteDto,
  ): Promise<InstituteEntity> {
    return await this.instituteService.create(createInstituteDto);
  }

  @Get()
  async findAll(): Promise<InstituteEntity[]> {
    return await this.instituteService.findAll();
  }

  @Get(':id')
  async findOneById(
    @Param('id') instituteId: number,
  ): Promise<InstituteEntity> {
    return await this.instituteService.findOneById(instituteId);
  }

  @Put(':id')
  async update(
    @Param('id') instituteId: number,
    @Body() updateInstituteDto: UpdateInstituteDto,
  ): Promise<InstituteEntity> {
    return await this.instituteService.updateOne(
      instituteId,
      updateInstituteDto,
    );
  }

  @Delete(':id')
  async remove(@Param('id') instituteId: number): Promise<InstituteEntity[]> {
    return await this.instituteService.deleteOne(instituteId);
  }
}
