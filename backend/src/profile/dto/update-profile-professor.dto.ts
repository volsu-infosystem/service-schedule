import { IsNumber, IsOptional } from 'class-validator';
import { UpdateProfileBaseDto } from './update-profile-base.dto';

export class UpdateProfileProfessorDto extends UpdateProfileBaseDto {
  @IsOptional()
  @IsNumber()
  readonly cathedraId: number;

  @IsOptional()
  @IsNumber({}, { each: true })
  readonly teachedDisciplinesIds: number[];
}
