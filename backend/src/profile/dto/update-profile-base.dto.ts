import { IsEmail, IsEnum, IsNumber, IsString, Length } from 'class-validator';
import { UserEntity } from 'src/user/entities/user.entity';
import { profileTypeEnum } from '../enums/profileType.enum';

export class UpdateProfileBaseDto {
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

  readonly user: UserEntity;

  @IsEnum(profileTypeEnum)
  readonly profileType: profileTypeEnum;
}
