import { IsNumber, IsOptional, Length } from 'class-validator';
import { UpdateProfileBaseDto } from './update-profile-base.dto';

export class UpdateProfileStudentDto extends UpdateProfileBaseDto {
  @IsOptional()
  @IsNumber()
  @Length(6, 8)
  readonly studentTicketNumber: number;

  @IsOptional()
  @IsNumber()
  readonly groupId: number;

  @IsOptional()
  @IsNumber({}, { each: true })
  readonly subGroupIds: number[];
}
