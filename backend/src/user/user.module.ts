import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from './entities/role.entity';
import { User } from './entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Role])],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
