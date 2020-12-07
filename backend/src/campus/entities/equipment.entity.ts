import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { RoomEntity } from './room.entity'

@Entity({name: 'equipment'})
export class EquipmentEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: 'varchar', length: 256})
    name: string;

    @Column({type: 'varchar', length: 2048, nullable: true})
    desc: string;

    @ManyToOne(() => RoomEntity, room => room.equipments, { nullable: true })
    room: RoomEntity;
}