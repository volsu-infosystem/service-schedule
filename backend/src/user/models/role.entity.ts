import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'

@Entity({name: 'role'})
export class Role {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: 'varchar', length: 64})
    name: string;

    @OneToMany(() => User, user => user.role)
    users: User[]
}