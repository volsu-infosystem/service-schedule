import { Column, Entity, OneToMany } from 'typeorm'
import { Cell } from './cell.entity'

@Entity({name: "schedule"})
export class Schedule {
    @OneToMany(() => Cell, cell => cell.schedule)
    cells: Cell[]

    @Column({type: 'smallint'})
    semester: number
}