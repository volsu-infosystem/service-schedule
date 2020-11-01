import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { AdmissionYear } from '../../profile/entities/admissionYear.entity';
import { Cathedra } from './cathedra.entity'

@Entity({name: 'institute'})
export class Institute {

    @PrimaryGeneratedColumn()
    id: number;

    @Column('varchar', { length: 256 })
    name: string;

    @OneToMany(() => Cathedra, cathedra => cathedra.institute)
    cathedras: Cathedra[];

    @OneToMany(() => AdmissionYear, admissionYear => admissionYear.institute)
    admissionYears: AdmissionYear[]
}