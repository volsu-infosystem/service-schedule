import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { InsertCellDto } from './dto/insert-cell.dto';
import { CellEntity } from './entities/cell.entity';
import { ScheduleEntity } from './entities/schedule.entity';
import { LessonService } from './lesson.service';

@Injectable()
export class CellService {
  constructor(
    @InjectRepository(CellEntity)
    private readonly cellRepository: Repository<CellEntity>,
    private readonly lessonService: LessonService,
  ) {}

  async findOneCellById(id: number): Promise<CellEntity> {
    return await this.cellRepository.findOne(id);
  }

  async createCellsDefault(schedules: ScheduleEntity[]): Promise<CellEntity[]> {
    const newCellPromises = [];
    const createdCells = [];

    for (const schedule of schedules) {
      for (let i = 0; i < 7; i++) {
        for (let j = 0; j < 8; j++) {
          newCellPromises.push(
            (async () => {
              const newCell = await this.cellRepository.create(schedule);
              newCell.schedule = { id: schedule.id } as ScheduleEntity;
              newCell.day = i;
              newCell.order = j;
              createdCells.push(newCell);
            })(),
          );
        }
      }
    }

    await Promise.all(newCellPromises);
    console.log(createdCells);
    await this.cellRepository.save(createdCells);

    return createdCells;
  }

  async insertCell(
    cellId: number,
    insertCellDto: InsertCellDto,
  ): Promise<CellEntity> {
    console.log(insertCellDto);
    insertCellDto.lessons.forEach(async lesson => {
      return await this.lessonService.insertLesson(cellId, lesson);
    });

    const updatedCell = await this.findOneCellById(cellId);

    return updatedCell;
  }
}
