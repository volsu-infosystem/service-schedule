import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user.entity';

@Entity({ name: 'role' })
export class Role {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { length: 64 })
  name: string;

  @OneToMany(
    () => User,
    user => user.role,
  )
  users: User[];
}
