import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SubGroupEntity } from 'src/group/entities/subGroup.entity';
import { Repository } from 'typeorm';
import { CreateSubCellDto } from './dto/create-sub-cell.dto';
import { InsertLessonsToCellDto } from './dto/insert-lessons-to-cell.dto';
import { CellEntity } from './entities/cell.entity';
import { SubCellEntity } from './entities/sub-cell.entity';
import { LessonService } from './lesson.service';

@Injectable()
export class SubCellService {
  constructor(
    @InjectRepository(SubCellEntity)
    private readonly subCellRepository: Repository<SubCellEntity>,
    private readonly lessonService: LessonService,
  ) {}

  async create(subCell: CreateSubCellDto): Promise<SubCellEntity> {
    const cell = { id: subCell.cellId } as CellEntity;
    const subGroup = { id: subCell.subGroupId } as SubGroupEntity;
    const newSubCell = await this.subCellRepository.create({ cell, subGroup });

    return await this.subCellRepository.save(newSubCell);
  }

  async findOneWithLessonsByCellAndSubGroup(
    cellId: number,
    subGroupId: number,
  ): Promise<SubCellEntity> {
    return await this.subCellRepository
      .createQueryBuilder('subCell')
      .innerJoinAndSelect('subCell.cell', 'cell')
      .where('cell.id = :cellId', { cellId })
      .innerJoinAndSelect('subCell.subGroup', 'subGroup')
      .where('subGroup.id = :subGroupId', { subGroupId })
      .leftJoinAndSelect('subCell.lessons', 'lessons')
      .getOne();
  }

  async provideSubCell(
    cellId: number,
    subGroupId: number,
  ): Promise<SubCellEntity> {
    /* @TODO fix findOneWithLessonsByCellAndSubGroup method */
    // const subCell = await this.findOneWithLessonsByCellAndSubGroup(
    //   cellId,
    //   subGroupId,
    // );

    // if (subCell) return subCell;

    return await this.create({ cellId, subGroupId });
  }

  async createSubCells(
    cellId: number,
    cells: InsertLessonsToCellDto,
  ): Promise<SubCellEntity[]> {
    const subCells = await Promise.all(
      cells.subCells.map(async subCell => {
        const currSubCell = await this.provideSubCell(
          cellId,
          subCell.subGroupId,
        );
        currSubCell.lessons = await this.lessonService.createLessons(
          currSubCell.id,
          subCell.lessons,
        );
        return currSubCell;
      }),
    );

    return subCells;
  }
}
