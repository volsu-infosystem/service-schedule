import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { Max, Min } from 'class-validator';
import { ScheduleEntity } from './schedule.entity'
import { SubCellEntity } from './subCell.entity';
import { weekDaysEnum } from '../enums/weekDays.enum'

@Entity('cell')
export class CellEntity {
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column('enum', { enum: weekDaysEnum })
    dayWeek: weekDaysEnum;

    @Column('smallint')
    @Min(1)
    @Max(7)
    time: number;

    @ManyToOne(() => ScheduleEntity, schedule => schedule.cells)
    schedule: ScheduleEntity;

    @OneToMany(() => SubCellEntity, subCell => subCell.cell, {nullable: true})
    subCells: SubCellEntity[];
}