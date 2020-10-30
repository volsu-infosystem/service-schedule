import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne } from 'typeorm';
import { Group } from '../../group/entities/group.entity';
import { studyLevelEnum } from '../enums/studyLevel.enum'
import { Institute } from '../../institute/entities/institute.entity';

@Entity({name: 'admission_year'})
export class AdmissionYear {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: 'smallint'})
    year: number;

    @Column({type: 'enum', enum: studyLevelEnum})
    studyLevel: studyLevelEnum;

    @ManyToOne(() => Institute, institute => institute.admissionYears)
    institute: Institute;

    @OneToMany(() => Group, group => group.cathedra)
    groups: Group[];
}