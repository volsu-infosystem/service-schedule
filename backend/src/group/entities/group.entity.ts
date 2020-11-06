import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn, OneToOne } from 'typeorm';
import { ProfileStudent } from '../../profile/entities/profileStudent.entity';
import { AdmissionYear } from '../../profile/entities/admissionYear.entity';
import { StudyDirection } from '../../discipline/entities/studyDirection.entity';
import { Cathedra } from '../../institute/entities/cathedra.entity'
import { Schedule } from 'src/schedule/entities/schedule.entity';
import { SubGroup } from './subGroup.entity';

@Entity('group')
export class Group {
    @PrimaryGeneratedColumn()
    id: number

    @Column('varchar', { length: 64 })
    name: string;

    @ManyToOne(() => Cathedra, cathedra => cathedra.groups)
    cathedra: Cathedra;

    @ManyToOne(() => StudyDirection, studyDirection => studyDirection.group)
    studyDirection: StudyDirection;

    @ManyToOne(() => AdmissionYear, admissionYear => admissionYear.groups)
    admissionYear: AdmissionYear;   

    @OneToMany(() => ProfileStudent, profileStudent => profileStudent.group)
    students: ProfileStudent[]

    @OneToMany(() => SubGroup, subGroup => subGroup.group)
    subGroups: SubGroup[]

    @OneToOne(() => ProfileStudent)
    @JoinColumn()
    groupLeader: ProfileStudent

    @OneToOne(() => Schedule)
    @JoinColumn()
    schedule: Schedule;
}