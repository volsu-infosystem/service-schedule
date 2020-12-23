import { IsEmail, IsNotEmpty } from 'class-validator';

export class RegisterUserDto {
  @IsEmail()
  @IsNotEmpty({ message: 'E-mail is required' })
  readonly email: string;
}
