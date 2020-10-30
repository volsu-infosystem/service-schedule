import { Entity, Column, ManyToOne } from 'typeorm';
import { MaxLength, MinLength } from 'class-validator';
import { ProfileBase } from './profileBase.entity';
import { Group } from '../../group/entities/group.entity';

@Entity({name: 'profile_student'})
export class ProfileStudent extends ProfileBase {

    @Column({type: 'numeric'})
    @MinLength(6)
    @MaxLength(8)
    studentTicketNumber: number;
    
    @ManyToOne(() => Group, group => group.students)
    group: Group;
}