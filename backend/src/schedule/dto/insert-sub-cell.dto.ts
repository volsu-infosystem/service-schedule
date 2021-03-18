import { CreateLessonDto } from './create-lesson.dto';

export class InsertSubCellDto {
  readonly subGroupId: number;
  readonly lessons: CreateLessonDto[];
}
