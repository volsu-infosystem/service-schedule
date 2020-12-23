import { IsString, Length } from 'class-validator';

export class UpdateCampusDto {
  @IsString()
  @Length(1, 256)
  readonly name: string;
}
