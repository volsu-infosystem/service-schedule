import { InsertSubCellDto } from './insert-sub-cell.dto';

export class InsertLessonsToCellDto {
  readonly day: number;
  readonly order: number;
  readonly subCells: InsertSubCellDto[];
}
