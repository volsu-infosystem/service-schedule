import { Column, Entity, OneToMany } from 'typeorm'
import { Room } from './room.entity';

@Entity({name: "campus"})
export class Campus {
    
    @Column({type: 'varchar'})
    name: string;

    @OneToMany(() => Room, room => room.campus)
    rooms: Room[]
}