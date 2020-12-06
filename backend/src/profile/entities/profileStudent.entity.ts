import { Entity, Column, ManyToOne } from 'typeorm';
import { Length } from 'class-validator';
import { GroupEntity } from '../../group/entities/group.entity';
import { ProfileBaseEntity } from './profileBase.entity';

@Entity('profile_student')
export class ProfileStudentEntity extends ProfileBaseEntity {
    @Column('numeric')
    @Length(6, 8)
    studentTicketNumber: number;
    
    @ManyToOne(() => GroupEntity, group => group.students)
    group: GroupEntity;
}