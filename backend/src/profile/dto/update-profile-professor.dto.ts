import { IsNumber } from 'class-validator';
import { UpdateProfileBaseDto } from './update-profile-base.dto';

export class UpdateProfileProfessorDto extends UpdateProfileBaseDto {
  @IsNumber()
  readonly cathedraId: number;
}
