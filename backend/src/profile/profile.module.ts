import { Module } from '@nestjs/common';
import { ProfileController } from './profile.controller';
import { ProfileService } from './profile.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProfileStudentEntity } from './entities/profileStudent.entity';
import { ProfileProfessorEntity } from './entities/profileProfessor.entity';
import { AdmissionYearEntity } from './entities/admissionYear.entity';
import { AdmissionYearController } from './admissionYear.controller';
import { AdmissionYearService } from './admissionYear.service';

@Module({
  imports: [TypeOrmModule.forFeature([ProfileStudentEntity, ProfileProfessorEntity, AdmissionYearEntity])],
  controllers: [ProfileController, AdmissionYearController],
  providers: [ProfileService, AdmissionYearService],
  exports: [ProfileService]
})
export class ProfileModule {}
