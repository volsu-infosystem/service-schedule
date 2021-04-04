import { IsNumber, IsOptional } from 'class-validator';
import { CreateProfileBaseDto } from './create-profile-base.dto';

export class CreateProfileStudentDto extends CreateProfileBaseDto {
  @IsNumber()
  readonly studentTicketNumber: number;

  @IsNumber()
  readonly groupId: number;

  @IsOptional()
  @IsNumber({}, { each: true })
  readonly subGroupIds?: number[];
}
