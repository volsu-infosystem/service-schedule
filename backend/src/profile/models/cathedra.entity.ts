import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne } from 'typeorm';
import { Institute } from './institute.entity';
import { Group } from './group.entity'
import { ProfileProfessor } from './profileProfessor.entity';

@Entity({name: 'cathedra'})
export class Cathedra {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: 'varchar', length: 256})
    name: string;

    @ManyToOne(() => Institute, institute => institute.cathedras)
    institute: Institute

    @OneToMany(() => Group, group => group.cathedra)
    groups: Group[];

    @OneToMany(() => ProfileProfessor, profileProfessor => profileProfessor.cathedra)
    professors: ProfileProfessor
}