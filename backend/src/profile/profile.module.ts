import { Module } from '@nestjs/common';
import { ProfileController } from './profile.controller';
import { ProfileService } from './profile.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProfileStudent } from './entities/profileStudent.entity';
import { ProfileProfessor } from './entities/profileProfessor.entity';
import { AdmissionYear } from './entities/admissionYear.entity';
import { ProfileBase } from './entities/profileBase.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ProfileBase, ProfileStudent, ProfileProfessor, AdmissionYear])],
  controllers: [ProfileController],
  providers: [ProfileService]
})
export class ProfileModule {}
