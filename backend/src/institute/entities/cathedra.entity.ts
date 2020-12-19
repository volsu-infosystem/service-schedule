import { GroupEntity } from "src/group/entities/group.entity";
import { ProfileProfessorEntity } from "src/profile/entities/profileProfessor.entity";
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from "typeorm";
import { InstituteEntity } from "./institute.entity";

@Entity('cathedra')
export class CathedraEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('varchar', { length: 256 })
    name: string;

    @ManyToOne(() => GroupEntity, group => group.cathedra)
    groups: GroupEntity[];

    @ManyToOne(() => InstituteEntity, institute => institute.cathedras)
    institute: InstituteEntity

    @OneToMany(() => ProfileProfessorEntity, profileProfessor => profileProfessor.cathedra)
    professors: ProfileProfessorEntity
}