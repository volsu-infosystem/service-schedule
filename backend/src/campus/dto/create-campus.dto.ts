import { IsString } from 'class-validator';

export class CreateCampusDto {
  @IsString()
  readonly name: string;
}
