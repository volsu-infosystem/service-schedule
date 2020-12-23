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
import { MailModule } from './mail/mail.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    MailerModule.forRoot({
      transport: {
        host: 'smtp.yandex.ru',
        port: 465,
        secure: true,
        auth: {
          user: 'volsu-application',
          pass: 'zSK-bKm-E6X-g8z',
        },
      },
      defaults: {
        from: '"VolSU Application" <volsu-application@yandex.ru>',
      },
      template: {
        dir: './dist/mail/templates',
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
    MailModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
