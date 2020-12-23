import { IsNumber, Length } from 'class-validator';
import { UpdateProfileBaseDto } from './update-profile-base.dto';

export class UpdateProfileStudentDto extends UpdateProfileBaseDto {
  @IsNumber()
  @Length(6, 8)
  readonly studentTicketNumber: number;

  @IsNumber()
  readonly groupId: number;
}
