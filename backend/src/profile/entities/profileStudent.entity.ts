import { Entity, Column, ManyToOne } from 'typeorm';
import { MaxLength, MinLength } from 'class-validator';
import { Group } from '../../group/entities/group.entity';
import { ProfileBase } from './profileBase.entity';

@Entity('profile_student')
export class ProfileStudent extends ProfileBase {
    @Column('numeric')
    @MinLength(6)
    @MaxLength(8)
    studentTicketNumber: number;
    
    @ManyToOne(() => Group, group => group.students)
    group: Group;
}