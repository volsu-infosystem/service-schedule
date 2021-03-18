import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCellDto } from './dto/create-cell.dto';
import { InsertLessonsToCellDto } from './dto/insert-lessons-to-cell.dto';
import { CellEntity } from './entities/cell.entity';
import { ScheduleEntity } from './entities/schedule.entity';
import { SubCellService } from './sub-cell.service';

@Injectable()
export class CellService {
  constructor(
    @InjectRepository(CellEntity)
    private readonly cellRepository: Repository<CellEntity>,
    private readonly subCellService: SubCellService,
  ) {}

  async create(cell: CreateCellDto): Promise<CellEntity> {
    const newCell = await this.cellRepository.create(cell);
    newCell.schedule = { id: cell.scheduleId } as ScheduleEntity;

    return await this.cellRepository.save(newCell);
  }

  async findOneCellById(id: number): Promise<CellEntity> {
    return await this.cellRepository.findOne(id);
  }

  async findOneByDayAndOrder(
    scheduleId: number,
    day: number,
    order: number,
  ): Promise<CellEntity> {
    return await this.cellRepository
      .createQueryBuilder('cell')
      .leftJoinAndSelect('cell.schedule', 'schedule')
      .where('cell.schedule.id = :scheduleId', { scheduleId })
      .andWhere('cell.day = :day AND cell.order = :order', { day, order })
      .getOne();
  }

  async provideCell(
    scheduleId: number,
    day: number,
    order: number,
  ): Promise<CellEntity> {
    const cell = await this.findOneByDayAndOrder(scheduleId, day, order);

    if (cell) return cell;

    const schedule = { id: scheduleId } as ScheduleEntity;
    const newCell = await this.cellRepository.create({
      schedule,
      day,
      order,
    });
    return await this.cellRepository.save(newCell);
  }

  async insertToCell(
    scheduleId: number,
    insertLessonsToCellDto: InsertLessonsToCellDto,
  ): Promise<CellEntity> {
    const cell = await this.provideCell(
      scheduleId,
      insertLessonsToCellDto.day,
      insertLessonsToCellDto.order,
    );

    cell.subCells = await this.subCellService.createSubCells(
      cell,
      insertLessonsToCellDto,
    );
    return cell;
  }
}
