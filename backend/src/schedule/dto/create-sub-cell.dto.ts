import { CellEntity } from '../entities/cell.entity';
import { PeriodicityEnum } from '../enums/periodicity.enum';

export class CreateSubCellDto {
  readonly cellId: number;
  readonly subGroupId: number;
  readonly periodicity: PeriodicityEnum;
}
