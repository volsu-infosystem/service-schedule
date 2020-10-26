import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, ManyToMany, JoinTable } from 'typeorm';
import { Group } from './group.entity';
import { ProfileStudent } from './profileStudent.entity';

@Entity({name: 'sub_group'})
export class SubGroup {
    
    @PrimaryGeneratedColumn()
    id: number

    @Column({type: 'varchar', length: 64})
    name: string;

    @ManyToMany(() => ProfileStudent)
    @JoinTable()
    students: ProfileStudent[]

    @ManyToOne(() => Group, group => group.subGroups)
    group: Group;
}