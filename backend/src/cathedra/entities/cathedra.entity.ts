import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne } from 'typeorm';
import { ProfileProfessorEntity } from '../../profile/entities/profileProfessor.entity';
import { GroupEntity } from '../../group/entities/group.entity'
import { InstituteEntity } from '../../institute/entities/institute.entity';

@Entity('cathedra')
export class CathedraEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('varchar', { length: 256 })
    name: string;

    @ManyToOne(() => GroupEntity, group => group.cathedraOwn)
    groups: GroupEntity[];

    @ManyToOne(() => InstituteEntity, institute => institute.cathedras)
    institute: InstituteEntity

    @OneToMany(() => ProfileProfessorEntity, profileProfessor => profileProfessor.cathedra)
    professors: ProfileProfessorEntity
}