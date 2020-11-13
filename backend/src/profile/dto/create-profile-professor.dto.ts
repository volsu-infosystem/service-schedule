import { IsNumber } from "class-validator";
import { CreateProfileBaseDto } from "./create-profile-base.dto";

export class CreateProfileProfessorDto extends CreateProfileBaseDto {
    @IsNumber()
    readonly cathedraId: number;
}