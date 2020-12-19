import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn, OneToOne } from 'typeorm';
import { ProfileStudentEntity } from '../../profile/entities/profileStudent.entity';
import { AdmissionYearEntity } from '../../profile/entities/admissionYear.entity';
import { StudyDirectionEntity } from '../../discipline/entities/studyDirection.entity';
import { CathedraEntity } from '../../institute/entities/cathedra.entity'
import { ScheduleEntity } from 'src/schedule/entities/schedule.entity';
import { SubGroupEntity } from './subGroup.entity';

@Entity('group')
export class GroupEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column('varchar', { length: 64 })
    name: string;

    @ManyToOne(() => StudyDirectionEntity, studyDirection => studyDirection.group)
    studyDirection: StudyDirectionEntity;

    @ManyToOne(() => CathedraEntity, cathedra => cathedra.groups)
    cathedra: CathedraEntity;

    @ManyToOne(() => AdmissionYearEntity, admissionYear => admissionYear.groups)
    admissionYear: AdmissionYearEntity;

    @OneToMany(() => ProfileStudentEntity, profileStudent => profileStudent.group)
    students: ProfileStudentEntity[]

    @OneToMany(() => SubGroupEntity, subGroup => subGroup.group)
    subGroups: SubGroupEntity[]

    @OneToOne(() => ProfileStudentEntity)
    @JoinColumn()
    groupLeader: ProfileStudentEntity

    @OneToOne(() => ScheduleEntity)
    @JoinColumn()
    schedule: ScheduleEntity;
}