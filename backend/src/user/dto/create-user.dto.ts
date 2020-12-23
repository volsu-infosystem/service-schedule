import { IsEmail, IsNotEmpty, IsNumber } from 'class-validator';
import { ProfileEntity } from 'src/profile/interfaces/profile.interface';
import { RoleEntity } from '../entities/role.entity';

export class CreateUserDto {
  @IsEmail()
  readonly email: string;

  @IsNumber()
  readonly secretCode: number;

  @IsNotEmpty({ message: 'Profile is required' })
  readonly profile: ProfileEntity;

  @IsNotEmpty({ message: 'RoleEntity is required' })
  readonly role: RoleEntity;
}
