import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProfileModule } from './profile/profile.module';
import { UserModule } from './user/user.module';
import { ScheduleModule } from './schedule/schedule.module';
import { DisciplineModule } from './discipline/discipline.module';
import { InstituteModule } from './institute/institute.module';
import { GroupModule } from './group/group.module';
import { CampusModule } from './campus/campus.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(), 
    ProfileModule, 
    UserModule, 
    ScheduleModule, 
    DisciplineModule, 
    InstituteModule, 
    GroupModule, 
    CampusModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
