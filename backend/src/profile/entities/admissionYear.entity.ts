import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne } from 'typeorm';
import { Institute } from '../../institute/entities/institute.entity';
import { Group } from '../../group/entities/group.entity';
import { studyLevelEnum } from '../enums/studyLevel.enum';

@Entity({name: 'admission_year'})
export class AdmissionYear {

    @PrimaryGeneratedColumn()
    id: number;

    @Column('smallint')
    year: number;

    @Column('enum', { enum: studyLevelEnum })
    studyLevel: studyLevelEnum;

    @ManyToOne(() => Institute, institute => institute.admissionYears)
    institute: Institute;

    @OneToMany(() => Group, group => group.cathedra)
    groups: Group[];
}