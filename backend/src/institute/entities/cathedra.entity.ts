import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne } from 'typeorm';
import { ProfileProfessor } from '../../profile/entities/profileProfessor.entity';
import { Group } from '../../group/entities/group.entity'
import { Institute } from './institute.entity';

@Entity({name: 'cathedra'})
export class Cathedra {

    @PrimaryGeneratedColumn()
    id: number;

    @Column('varchar', { length: 256 })
    name: string;

    @ManyToOne(() => Institute, institute => institute.cathedras)
    institute: Institute

    @OneToMany(() => Group, group => group.cathedra)
    groups: Group[];

    @OneToMany(() => ProfileProfessor, profileProfessor => profileProfessor.cathedra)
    professors: ProfileProfessor
}