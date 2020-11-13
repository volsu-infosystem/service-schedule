import { Entity, Column, ManyToOne } from 'typeorm';
import { Length } from 'class-validator';
import { Group } from '../../group/entities/group.entity';
import { ProfileBase } from './profileBase.entity';

@Entity('profile_student')
export class ProfileStudent extends ProfileBase {
    @Column('numeric')
    @Length(6, 8)
    studentTicketNumber: number;
    
    @ManyToOne(() => Group, group => group.students)
    group: Group;
}