import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { Max, Min } from 'class-validator';
import { Schedule } from './schedule.entity'
import { SubCell } from './subCell.entity';
import { weekDays } from '../enums/weekDays.enum'

@Entity('cell')
export class Cell {
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column('enum', { enum: weekDays })
    dayWeek: weekDays;

    @Column('smallint')
    @Min(1)
    @Max(7)
    time: number;

    @ManyToOne(() => Schedule, schedule => schedule.cells)
    schedule: Schedule;

    @OneToMany(() => SubCell, subCell => subCell.cell, {nullable: true})
    subCells: SubCell[];
}