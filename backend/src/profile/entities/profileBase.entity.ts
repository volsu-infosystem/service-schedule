import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { UserEntity } from 'src/user/entities/user.entity';

@Entity('profile_base')
export class ProfileBaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { length: 128, nullable: true })
  initials: string;

  @Column('varchar', { length: 64, nullable: true })
  firstName: string;

  @Column('varchar', { length: 64, nullable: true })
  lastName: string;

  @Column('varchar', { length: 64, nullable: true })
  middleName: string;

  @Column('varchar', { length: 256, unique: true })
  email: string;

  @OneToOne(() => UserEntity, { nullable: true })
  @JoinColumn()
  user: UserEntity;
}
