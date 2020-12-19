import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProfileModule } from './profile/profile.module';
import { UserModule } from './user/user.module';
import { ScheduleModule } from './schedule/schedule.module';
import { DisciplineModule } from './discipline/discipline.module';
import { InstituteModule } from './institute/institute.module';
import { GroupModule } from './group/group.module';
import { CampusModule } from './campus/campus.module';
import { AuthModule } from './auth/auth.module';
import { MailerModule } from '@nestjs-modules/mailer'
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { MailModule } from './mail/mail.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    MailerModule.forRoot({
      transport: 'smtps://user@domain.com:pass@smtp.domain.com',
      defaults: {
        from:'"rating-volsu" <ratingvolsu@domain.com>',
      },
      template: {
        dir: __dirname + '/src/mailer/views',
        adapter: new HandlebarsAdapter(),
        options: {
          strict: true,
        },
      },
    }),
    ProfileModule, 
    UserModule, 
    ScheduleModule, 
    DisciplineModule, 
    InstituteModule, 
    GroupModule, 
    CampusModule, 
    AuthModule, 
    MailModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
