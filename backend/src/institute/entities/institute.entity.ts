import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { AdmissionYearEntity } from '../../profile/entities/admissionYear.entity';
import { CathedraEntity } from '../../cathedra/entities/cathedra.entity'

@Entity('institute')
export class InstituteEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('varchar', { length: 256 })
    name: string;

    @OneToMany(() => CathedraEntity, cathedra => cathedra.institute)
    cathedras: CathedraEntity[];

    @OneToMany(() => AdmissionYearEntity, admissionYear => admissionYear.institute)
    admissionYears: AdmissionYearEntity[]
}