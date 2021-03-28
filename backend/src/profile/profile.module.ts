import { forwardRef, Module } from '@nestjs/common';
import { ProfileController } from './profile.controller';
import { ProfileService } from './profile.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProfileStudentEntity } from './entities/profileStudent.entity';
import { ProfileProfessorEntity } from './entities/profileProfessor.entity';
import { AdmissionYearEntity } from './entities/admissionYear.entity';
import { AdmissionYearController } from './admissionYear.controller';
import { AdmissionYearService } from './admissionYear.service';
import { GroupModule } from 'src/group/group.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ProfileStudentEntity,
      ProfileProfessorEntity,
      AdmissionYearEntity,
    ]),
    forwardRef(() => GroupModule),
  ],
  controllers: [ProfileController, AdmissionYearController],
  providers: [ProfileService, AdmissionYearService],
  exports: [ProfileService, AdmissionYearService],
})
export class ProfileModule {}
