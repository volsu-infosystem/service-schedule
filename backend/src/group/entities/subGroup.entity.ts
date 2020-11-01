import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, ManyToMany, JoinTable, OneToMany } from 'typeorm';
import { ProfileStudent } from '../../profile/entities/profileStudent.entity';
import { SubCell } from 'src/schedule/entities/subCell.entity';
import { Group } from './group.entity';

@Entity({name: 'sub_group'})
export class SubGroup {
    
    @PrimaryGeneratedColumn()
    id: number

    @Column('varchar', { length: 64 })
    name: string;

    @ManyToMany(() => ProfileStudent)
    @JoinTable()
    students: ProfileStudent[]

    @ManyToOne(() => Group, group => group.subGroups)
    group: Group;

    @OneToMany(() => SubCell, subCell => subCell.subGroup, {nullable: true})
    subCells: SubCell[];
}