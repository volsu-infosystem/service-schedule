import { SubGroup } from 'src/group/entities/subGroup.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from 'typeorm'
import { periodEnum } from '../enums/period.enum'
import { Cell } from './cell.entity';
import { Lesson } from './lesson.entity';

@Entity({name: "sub_cell"})
export class SubCell {
    
    @Column({type: "enum", enum: periodEnum})
    period: periodEnum;

    @ManyToOne(() => SubGroup, subGroup => subGroup.subCells)
    subGroup: SubGroup;

    @ManyToOne(() => Cell, cell => cell.subCells)
    cell: Cell;

    @OneToOne(() => Lesson)
    @JoinColumn()
    lesson: Lesson;


}