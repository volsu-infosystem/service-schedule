import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RoomEntity } from 'src/campus/entities/room.entity';
import { DisciplineEntity } from 'src/discipline/entities/discipline.entity';
import { ProfileProfessorEntity } from 'src/profile/entities/profileProfessor.entity';
import { Repository } from 'typeorm';
import { InsertLessonDto } from './dto/insert-lesson.dto';
import { LessonEntity } from './entities/lesson.entity';
import { SubCellService } from './sub-cell.service';
@Injectable()
export class LessonService {
  constructor(
    @InjectRepository(LessonEntity)
    private readonly lessonRepository: Repository<LessonEntity>,
    private readonly subCellService: SubCellService,
  ) {}

  async insertLesson(
    cellId: number,
    insertLesson: InsertLessonDto,
  ): Promise<LessonEntity> {
    //get subcell by cellId and subGroup
    const subCell = await this.subCellService.provideSubCell(
      cellId,
      insertLesson.subGroupId,
    );

    console.log(subCell);

    // check if prevLesson exist in SubCell
    // const subCellLessons = this.findOneBySubCell(subCell.id);

    // if lesson with that period Exist -> Update that Lesson with new Data
    // else lesson with that period Doesnt Exist -> Create new Lesson with that periodicity

    // if inserted Lesson has periodicity == ALWAYS then -> remove all lesson in this subCell with
    // period == NUMERATOR , DENOMINATOR

    // const newLesson = this.lessonRepository.create(insertLesson);
    // const [discipline, professor, room] = [
    //   insertLesson.disciplineId
    //     ? ({
    //         id: insertLesson.disciplineId,
    //       } as DisciplineEntity)
    //     : null,
    //   insertLesson.professorId
    //     ? ({
    //         id: insertLesson.professorId,
    //       } as ProfileProfessorEntity)
    //     : null,
    //   insertLesson.roomId ? ({ id: insertLesson.roomId } as RoomEntity) : null,
    // ];

    // if (discipline) newLesson.discipline = discipline;
    // if (professor) newLesson.professor = professor;
    // if (room) newLesson.room = room;

    return null as LessonEntity;
  }

  async findAll(): Promise<LessonEntity[]> {
    return await this.lessonRepository.find();
  }

  async findOneById(lessonId: number): Promise<LessonEntity> {
    return await this.lessonRepository.findOne({ id: lessonId });
  }

  async findOneBySubCell(subCellId: number): Promise<LessonEntity> {
    return await this.lessonRepository.findOne({
      relations: ['sub-cell'],
      where: { subCell: { id: subCellId } },
    });
  }

  async deleteOne(lessonId: number): Promise<LessonEntity[]> {
    const lessonToRemove = await this.lessonRepository.find({
      id: lessonId,
    });
    return await this.lessonRepository.remove(lessonToRemove);
  }
}
