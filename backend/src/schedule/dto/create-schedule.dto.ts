import { IsNumber } from 'class-validator';
import { GroupEntity } from 'src/group/entities/group.entity';

export class CreateScheduleDto {
  @IsNumber()
  readonly semester: number;

  @IsNumber()
  readonly groupId: number;

  group?: GroupEntity;
}
