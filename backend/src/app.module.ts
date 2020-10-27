import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProfileModule } from './profile/profile.module';
import { UserModule } from './user/user.module';
import { ScheduleModule } from './schedule/schedule.module';

@Module({
  imports: [TypeOrmModule.forRoot(), ProfileModule, UserModule, ScheduleModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
