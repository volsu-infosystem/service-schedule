import { Column, Entity, ManyToOne, OneToMany } from 'typeorm'
import { weekDays } from '../enums/weekDays.enum'
import { Schedule } from './schedule.entity'
import { Max, Min } from 'class-validator';
import { SubCell } from './subCell.entity';

@Entity({name: "cell"})
export class Cell {

    @Column({type: "enum", enum: weekDays})
    dayWeek: weekDays;

    @Column({type: "smallint"})
    @Min(1)
    @Max(7)
    time: number;

    @ManyToOne(() => Schedule, schedule => schedule.cells)
    schedule: Schedule;

    @OneToMany(() => SubCell, subCell => subCell.cell, {nullable: true})
    subCells: SubCell[];
}