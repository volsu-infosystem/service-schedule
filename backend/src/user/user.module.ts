import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoleEntity } from './entities/role.entity';
import { UserEntity } from './entities/user.entity';
import { UserRepository } from './user.repository';
import { RoleService } from './role.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, RoleEntity, UserRepository])],
  controllers: [UserController],
  providers: [UserService, RoleService],
  exports: [UserService, RoleService]
})
export class UserModule {}
