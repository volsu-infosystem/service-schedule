import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { Cell } from './cell.entity'

@Entity('schedule')
export class Schedule {
    @PrimaryGeneratedColumn()
    id: number;
    
    @OneToMany(() => Cell, cell => cell.schedule)
    cells: Cell[]

    @Column('smallint')
    semester: number
}