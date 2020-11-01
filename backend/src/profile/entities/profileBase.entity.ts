import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm';
import { IsEmail } from 'class-validator';
import { User } from 'src/user/models/user.entity';

@Entity({name: 'profile_base'})
export class ProfileBase {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('varchar', { length: 64 })
    firstName: string;

    @Column('varchar', { length: 64 })
    lastName: string;

    @Column('varchar', { length: 64 })
    middleName: string;

    @Column('varchar', { length: 256, unique: true })
    @IsEmail()
    email: string;

    @OneToOne(() => User, { nullable: true })
    @JoinColumn()
    user: User;
}