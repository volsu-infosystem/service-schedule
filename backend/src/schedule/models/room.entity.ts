import { Equipment } from 'src/profile/models/equipment.entity';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm'
import { Campus } from './campus.entity'
import { Lesson } from './lesson.entity';

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