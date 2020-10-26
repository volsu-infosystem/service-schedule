import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { AdmissionYear } from './admissionYear.entity';
import { Cathedra } from './cathedra.entity'
import { ProfileStudent } from './profileStudent.entity';
import { StudyDirection } from './studyDirection.entity';
import { SubGroup } from './subGroup.entity';

@Entity({name: 'group'})
export class Group {
    
    @PrimaryGeneratedColumn()
    id: number

    @Column({type: 'varchar', length: 64})
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

    @Column()
    groupLeader: ProfileStudent

    // TO DO Schedule
    // Schedule <...>
}