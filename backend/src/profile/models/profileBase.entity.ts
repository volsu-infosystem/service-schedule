import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm';
import { User } from 'src/user/models/user.entity';
import { IsEmail } from 'class-validator';

@Entity({name: 'profile_base'})
export class ProfileBase {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: 'varchar', length: 64})
    firstName: string;

    @Column({type: 'varchar', length: 64})
    lastName: string;

    @Column({type: 'varchar', length: 64})
    middleName: string;

    @Column({type: 'varchar', length: 256, unique: true})
    @IsEmail()
    email: string;

    @OneToOne(() => User, { nullable: true })
    @JoinColumn()
    user: User;
}