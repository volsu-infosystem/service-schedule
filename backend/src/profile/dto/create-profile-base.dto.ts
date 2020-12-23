import { IsEmail, IsEnum, IsNumber, IsString, Length } from 'class-validator';
import { profileTypeEnum } from '../enums/profileType.enum';

export class CreateProfileBaseDto {
  @IsString()
  @Length(2, 64)
  readonly firstName: string;

  @IsString()
  @Length(2, 64)
  readonly lastName: string;

  @IsString()
  @Length(2, 64)
  readonly middleName?: string;

  @IsEmail()
  @Length(0, 256)
  readonly email: string;

  @IsNumber()
  @Length(6, 8)
  readonly userId?: string;

  @IsEnum(profileTypeEnum)
  readonly profileType: profileTypeEnum;
}
