import { Entity, PrimaryGeneratedColumn, Column, OneToOne, ManyToOne } from 'typeorm';
import { ProfileBase } from 'src/profile/entities/profileBase.entity';
import { Role } from './role.entity';

@Entity({name: 'user'})
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: "varchar", length: 16})
    login: string;

    @Column({type: "varchar", length: 300})
    password: string;

    @OneToOne(() => ProfileBase, profileBase => profileBase.user)
    profile: ProfileBase;

    @ManyToOne(() => Role, role => role.users)
    role: Role


}