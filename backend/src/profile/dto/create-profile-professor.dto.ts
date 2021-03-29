import { IsEmail, IsNumber, IsOptional, Length } from 'class-validator';
import { CreateProfileBaseDto } from './create-profile-base.dto';

export class CreateProfileProfessorDto extends CreateProfileBaseDto {
  @IsNumber()
  readonly cathedraId: number;

  @IsOptional()
  @IsEmail()
  @Length(0, 256)
  readonly email: string;

  @IsOptional()
  @IsNumber({}, { each: true })
  readonly teachedDisciplinesIds: number[];
}
