import {
  IsEmail,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';

export class CreateProfileBaseDto {
  @IsString()
  @Length(2, 64)
  readonly firstName?: string;

  @IsString()
  @Length(2, 64)
  readonly lastName?: string;

  @IsOptional()
  @IsString()
  @Length(2, 64)
  readonly middleName?: string;

  @IsOptional()
  @IsEmail()
  @Length(0, 256)
  readonly email: string;

  @IsOptional()
  @IsNumber()
  readonly userId?: number;
}
