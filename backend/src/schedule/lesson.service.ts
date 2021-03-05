import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RoomEntity } from 'src/campus/entities/room.entity';
import { DisciplineEntity } from 'src/discipline/entities/discipline.entity';
import { ProfileProfessorEntity } from 'src/profile/entities/profileProfessor.entity';
import { Repository } from 'typeorm';
import { CreateLessonDto } from './dto/create-lesson.dto';
import { LessonEntity } from './entities/lesson.entity';
import { SubCellEntity } from './entities/sub-cell.entity';

@Injectable()
export class LessonService {
  constructor(
    @InjectRepository(LessonEntity)
    private readonly lessonRepository: Repository<LessonEntity>,
  ) {}

  async removeLessons(lessons: LessonEntity[]): Promise<LessonEntity[]> {
    return await this.lessonRepository.remove(lessons);
  }

  async saveLessons(lessons: LessonEntity[]): Promise<LessonEntity[]> {
    return await this.lessonRepository.save(lessons);
  }

  async createLessons(
    subCellId: number,
    lessons: CreateLessonDto[],
  ): Promise<LessonEntity[]> {
    const subCell = { id: subCellId } as SubCellEntity;

    const createdLessons = await Promise.all(
      lessons.map(async lesson => {
        const newLesson = await this.lessonRepository.create(lesson);
        newLesson.subCell = subCell;
        newLesson.discipline = { id: lesson.disciplineId } as DisciplineEntity;
        newLesson.professor = {
          id: lesson.professorId,
        } as ProfileProfessorEntity;
        newLesson.room = { id: lesson.roomId } as RoomEntity;
        return newLesson;
      }),
    );

    return await this.saveLessons(createdLessons);
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
