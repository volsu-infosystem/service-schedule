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
import { DisciplineHouredService } from './disciplineHoured.service';
import { CreateDisciplineHouredDto } from './dto/create-discipline-houred';
import { UpdateDisciplineHouredDto } from './dto/update-discipline-houred.dto';
import { DisciplineHouredEntity } from './entities/disciplineHoured.entity';

@Controller('disciplinehoured')
@UseGuards(JwtAuthGuard)
export class DisciplineHouredController {
  constructor(
    private readonly disciplinehouredService: DisciplineHouredService,
  ) {}

  @Post()
  async create(
    @Body() createDisciplineHouredDto: CreateDisciplineHouredDto,
  ): Promise<DisciplineHouredEntity> {
    return await this.disciplinehouredService.create(createDisciplineHouredDto);
  }

  @Get()
  async findAll(): Promise<DisciplineHouredEntity[]> {
    return await this.disciplinehouredService.findAll();
  }

  @Get(':id')
  async findOneById(
    @Param('id') disciplinehouredId: number,
  ): Promise<DisciplineHouredEntity> {
    return await this.disciplinehouredService.findOneById(disciplinehouredId);
  }

  @Put(':id')
  async update(
    @Param('id') disciplinehouredId: number,
    @Body() updateDisciplineHouredDto: UpdateDisciplineHouredDto,
  ): Promise<DisciplineHouredEntity> {
    return await this.disciplinehouredService.updateOne(
      disciplinehouredId,
      updateDisciplineHouredDto,
    );
  }

  @Delete(':id')
  async remove(
    @Param('id') disciplinehouredId: number,
  ): Promise<DisciplineHouredEntity[]> {
    return await this.disciplinehouredService.deleteOne(disciplinehouredId);
  }
}
