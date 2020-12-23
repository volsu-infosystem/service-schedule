import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Put,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CathedraService } from './cathedra.service';
import { CreateCathedraDto } from './dto/create-cathedra.dto';
import { UpdateCathedraDto } from './dto/update-cathedra.dto';
import { CathedraEntity } from './entities/cathedra.entity';

@Controller('cathedra')
@UseGuards(JwtAuthGuard)
export class CathedraController {
  constructor(private readonly cathedraService: CathedraService) {}

  @Post()
  async create(
    @Body() createCathedraDto: CreateCathedraDto,
  ): Promise<CathedraEntity> {
    return await this.cathedraService.create(createCathedraDto);
  }

  @Get()
  async findAll(): Promise<CathedraEntity[]> {
    return await this.cathedraService.findAll();
  }

  @Get(':id')
  async findOneById(@Param('id') cathedraId: number): Promise<CathedraEntity> {
    return await this.cathedraService.findOneById(cathedraId);
  }

  @Put(':id')
  async update(
    @Param('id') cathedraId: number,
    @Body() updateCathedraDto: UpdateCathedraDto,
  ): Promise<CathedraEntity> {
    return await this.cathedraService.updateOne(cathedraId, updateCathedraDto);
  }

  @Delete(':id')
  async remove(@Param('id') cathedraId: number): Promise<CathedraEntity[]> {
    return await this.cathedraService.deleteOne(cathedraId);
  }
}
