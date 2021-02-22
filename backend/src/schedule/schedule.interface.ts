export interface ScheduleResponse {
  readonly scheduleId: number;
  readonly semester: number;
  readonly lessons: LessonResponse[];
}

export interface LessonResponse {
  readonly id: number;
  readonly discipline: string;
  readonly professor: string;
  readonly room: string;
  readonly lessonType: string;
  readonly importanceStatus: string;
  readonly startTime: string;
  readonly endTime: string;
  readonly periodicity: string;
}
