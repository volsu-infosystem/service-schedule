import { IsNumber, IsString, Length } from 'class-validator';
import { InstituteEntity } from '../entities/institute.entity';

export class CreateCathedraDto {
  @IsString()
  @Length(3, 256)
  readonly name: string;

  @IsNumber()
  readonly instituteId: number;

  institute?: InstituteEntity;
}
