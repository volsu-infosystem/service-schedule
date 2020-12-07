import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  ManyToOne,
} from 'typeorm';
import { ProfileBaseEntity } from '../../profile/entities/profileBase.entity';
import { RoleEntity } from './role.entity';
import { ProfileEntity } from 'src/profile/interfaces/profile.interface'

@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { length: 256, unique: true })
  email: string; 
  
  @OneToOne(
    () => ProfileBaseEntity,
    profileBase => profileBase.user,
  )
  profile: ProfileEntity;

  @ManyToOne(
    () => RoleEntity,
    role => role.users,
    { nullable: true }
  )
  role: RoleEntity;
}
