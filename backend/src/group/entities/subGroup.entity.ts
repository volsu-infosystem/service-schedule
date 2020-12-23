import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  ManyToMany,
  JoinTable,
  OneToMany,
} from 'typeorm';
import { ProfileStudentEntity } from '../../profile/entities/profileStudent.entity';
import { SubCellEntity } from 'src/schedule/entities/subCell.entity';
import { GroupEntity } from './group.entity';

@Entity('sub_group')
export class SubGroupEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { length: 64 })
  name: string;

  @ManyToMany(
    () => ProfileStudentEntity,
    student => student.subGroups,
    { cascade: true },
  )
  @JoinTable({
    name: 'sub_groups_students',
    joinColumn: { name: 'sub_group_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'student_id', referencedColumnName: 'id' },
  })
  students: ProfileStudentEntity[];

  @ManyToOne(
    () => GroupEntity,
    group => group.subGroups,
  )
  group: GroupEntity;

  @OneToMany(
    () => SubCellEntity,
    subCell => subCell.subGroup,
    { nullable: true },
  )
  subCells: SubCellEntity[];
}
