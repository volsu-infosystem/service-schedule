import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { EquipmentEntity } from './equipment.entity';
import { CampusEntity } from './campus.entity'
import { LessonEntity } from 'src/schedule/entities/lesson.entity';

@Entity({name: "room"})
export class RoomEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => CampusEntity, campus => campus.rooms, { nullable: true })
    campus: CampusEntity;

    @Column('varchar', { length: 64 })
    name: string;

    @Column('smallint')
    capacity: number;

    @OneToMany(() => EquipmentEntity, equipment => equipment.room)
    equipments: EquipmentEntity[];

    @OneToMany(() => LessonEntity, lesson => lesson.room)
    lessons: LessonEntity[]    
    
}