import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  ManyToOne,
} from 'typeorm';
import { ProfileBase } from '../../profile/entities/profileBase.entity';
import { Role } from './role.entity';

@Entity('user')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { length: 16 })
  login: string;

  @Column('varchar', { length: 300 })
  password: string;

  @OneToOne(
    () => ProfileBase,
    profileBase => profileBase.user,
  )
  profile: ProfileBase;

  @ManyToOne(
    () => Role,
    role => role.users,
  )
  role: Role;
}
