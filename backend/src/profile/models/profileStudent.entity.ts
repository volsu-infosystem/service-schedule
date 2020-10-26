import { Entity, Column, ManyToOne } from 'typeorm';
import { Max, Min } from 'class-validator';
import { ProfileBase } from './profileBase.entity';
import { Group } from './group.entity';

@Entity({name: 'profile_student'})
export class ProfileStudent extends ProfileBase {

    @Column({type: 'numeric'})
    @Min(6)
    @Max(8)
    studentTicketNumber: number;
    
    @ManyToOne(() => Group, group => group.students)
    group: Group;
}