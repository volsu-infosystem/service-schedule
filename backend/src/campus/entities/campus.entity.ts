import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { Room } from './room.entity';

@Entity({name: "campus"})
export class Campus {
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column('varchar', { length: 256 })
    name: string;

    @OneToMany(() => Room, room => room.campus)
    rooms: Room[]
}