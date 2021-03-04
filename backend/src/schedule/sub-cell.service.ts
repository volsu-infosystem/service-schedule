import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SubGroupEntity } from 'src/group/entities/subGroup.entity';
import { Repository } from 'typeorm';
import { CellEntity } from './entities/cell.entity';
import { SubCellEntity } from './entities/sub-cell.entity';

@Injectable()
export class SubCellService {
  constructor(
    @InjectRepository(SubCellEntity)
    private readonly subCellRepository: Repository<SubCellEntity>,
  ) {}

  async create(cellId: number, subGroupId: number): Promise<SubCellEntity> {
    const cell = { id: cellId } as CellEntity;
    const subGroup = { id: subGroupId } as SubGroupEntity;
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
    const subCell = await this.findOneWithLessonsByCellAndSubGroup(
      cellId,
      subGroupId,
    );
    console.log(subCell);
    if (subCell) return subCell;

    return await this.create(cellId, subGroupId);
  }
}
