import { Column, Entity, ManyToOne, OneToMany } from 'typeorm'
import { Equipment } from './equipment.entity';
import { Campus } from './campus.entity'
import { Lesson } from 'src/schedule/entities/lesson.entity';

@Entity({name: "room"})
export class Room {

    @ManyToOne(() => Campus, campus => campus.rooms)
    campus: Campus;

    @Column({type: 'varchar'})
    name: string;

    @Column({type: 'smallint'})
    capacity: number;

    @OneToMany(() => Equipment, equipment => equipment.room)
    equipments: Equipment[];

    @OneToMany(() => Lesson, lesson => lesson.room)
    lessons: Lesson[]    
    
}