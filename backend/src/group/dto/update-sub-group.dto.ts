import { IsNumber, IsString, Length } from 'class-validator';

export class UpdateSubGroupDto {
  @IsString()
  @Length(1, 64)
  readonly name: string;

  @IsNumber()
  readonly groupId: number;
}
