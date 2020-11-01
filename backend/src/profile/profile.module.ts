import { Module } from '@nestjs/common';
import { ProfileController } from './profile.controller';
import { ProfileService } from './profile.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProfileBase } from './entities/profileBase.entity';
import { ProfileStudent } from './entities/profileStudent.entity';
import { ProfileProfessor } from './entities/profileProfessor.entity';
import { AdmissionYear } from './entities/admissionYear.entity';
import { ProfileBaseRepository } from './repositories/profileBase.repository';

@Module({
  imports: [TypeOrmModule.forFeature([ProfileBase, ProfileBaseRepository, ProfileStudent, ProfileProfessor, AdmissionYear])],
  controllers: [ProfileController],
  providers: [ProfileService]
})
export class ProfileModule {}
