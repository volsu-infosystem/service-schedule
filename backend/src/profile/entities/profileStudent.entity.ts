import { Entity, Column, ManyToOne, ManyToMany } from 'typeorm';
import { Length } from 'class-validator';
import { GroupEntity } from '../../group/entities/group.entity';
import { ProfileBaseEntity } from './profileBase.entity';
import { SubGroupEntity } from 'src/group/entities/subGroup.entity';

@Entity('profile_student')
export class ProfileStudentEntity extends ProfileBaseEntity {
  @Column('numeric')
  @Length(6, 8)
  studentTicketNumber: number;

  @ManyToOne(
    () => GroupEntity,
    group => group.students,
  )
  group: GroupEntity;

  @ManyToMany(
    () => SubGroupEntity,
    subGroup => subGroup.students,
    { nullable: true },
  )
  subGroups: SubGroupEntity[];
}
