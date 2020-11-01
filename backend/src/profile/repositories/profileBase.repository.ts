import { EntityRepository, Repository } from "typeorm";
import { ProfileBase } from "../entities/profileBase.entity";

@EntityRepository(ProfileBase)
export class ProfileBaseRepository extends Repository<ProfileBase> {

}