import { IsNumber, Length } from "class-validator";
import { CreateProfileBaseDto } from "./create-profile-base.dto";

export class CreateProfileStudentDto extends CreateProfileBaseDto {
    @IsNumber()
    @Length(6, 8)
    readonly studentTicketNumber: number;

    @IsNumber()
    readonly groupId: number;
}