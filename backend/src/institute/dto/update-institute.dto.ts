import { IsString, Length } from 'class-validator';

export class UpdateInstituteDto {
  @IsString()
  @Length(3, 256)
  readonly name: string;
}
