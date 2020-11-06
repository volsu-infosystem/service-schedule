import { Column, Entity, OneToMany } from 'typeorm'
import { Cell } from './cell.entity'

@Entity('schedule')
export class Schedule {
    @OneToMany(() => Cell, cell => cell.schedule)
    cells: Cell[]

    @Column('smallint')
    semester: number
}