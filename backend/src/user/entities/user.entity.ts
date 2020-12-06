import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  ManyToOne,
} from 'typeorm';
import { ProfileBaseEntity } from '../../profile/entities/profileBase.entity';
import { RoleEntity } from './role.entity';

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
  profile: ProfileBaseEntity;

  @ManyToOne(
    () => RoleEntity,
    role => role.users,
    { nullable: true }
  )
  role: RoleEntity;
}
