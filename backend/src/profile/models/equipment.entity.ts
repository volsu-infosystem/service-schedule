import { Room } from 'src/schedule/models/room.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'

@Entity({name: 'equipment'})
export class Equipment {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: 'varchar', length: 256})
    name: string;

    @Column({type: 'varchar', length: 2048})
    desc: string;

    @ManyToOne(() => Room, room => room.equipments)
    room: Room;
}