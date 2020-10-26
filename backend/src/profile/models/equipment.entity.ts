import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity({name: 'equipment'})
export class Equipment {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: 'varchar', length: 256})
    name: string;

    @Column({type: 'varchar', length: 2048})
    desc: string;
}