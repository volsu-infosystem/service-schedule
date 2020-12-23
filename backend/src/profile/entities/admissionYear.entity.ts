import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import { InstituteEntity } from '../../institute/entities/institute.entity';
import { GroupEntity } from '../../group/entities/group.entity';
import { studyLevelEnum } from '../enums/studyLevel.enum';

@Entity('admission_year')
export class AdmissionYearEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('smallint')
  year: number;

  @Column('enum', { enum: studyLevelEnum })
  studyLevel: studyLevelEnum;

  @ManyToOne(
    () => InstituteEntity,
    institute => institute.admissionYears,
  )
  institute: InstituteEntity;

  @OneToMany(
    () => GroupEntity,
    group => group.admissionYear,
  )
  groups: GroupEntity[];
}
