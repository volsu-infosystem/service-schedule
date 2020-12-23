import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { RoomEntity } from './room.entity';

@Entity({ name: 'campus' })
export class CampusEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { length: 256 })
  name: string;

  @OneToMany(
    () => RoomEntity,
    room => room.campus,
  )
  rooms: RoomEntity[];
}
