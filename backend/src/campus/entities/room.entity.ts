import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { Equipment } from './equipment.entity';
import { Campus } from './campus.entity'
import { Lesson } from 'src/schedule/entities/lesson.entity';

@Entity({name: "room"})
export class Room {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Campus, campus => campus.rooms)
    campus: Campus;

    @Column('varchar', { length: 64 })
    name: string;

    @Column('smallint')
    capacity: number;

    @OneToMany(() => Equipment, equipment => equipment.room)
    equipments: Equipment[];

    @OneToMany(() => Lesson, lesson => lesson.room)
    lessons: Lesson[]    
    
}