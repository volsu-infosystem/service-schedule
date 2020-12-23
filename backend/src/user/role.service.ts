import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeepPartial } from 'typeorm';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { RoleEntity } from './entities/role.entity';
import { RoleNotFoundException } from './exceptions/role.exceptions';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(RoleEntity)
    private readonly roleRepository: Repository<RoleEntity>,
  ) {}

  async getRoleByName(roleName: string): Promise<RoleEntity> {
    return await this.roleRepository.findOne({ where: { name: roleName } });
  }

  async create(role: CreateRoleDto): Promise<RoleEntity> {
    const newRole = this.roleRepository.create(role);
    return await this.roleRepository.save(newRole);
  }

  async findAll(): Promise<RoleEntity[]> {
    return await this.roleRepository.find();
  }

  async findOneById(roleId: number): Promise<RoleEntity> {
    return await this.roleRepository.findOne({ id: roleId });
  }

  async updateOne(
    roleId: number,
    updateRole: DeepPartial<UpdateRoleDto>,
  ): Promise<RoleEntity> {
    await this.roleRepository.update({ id: roleId }, updateRole);
    const updatedRole = await this.roleRepository.findOne(roleId);
    if (updatedRole) {
      return updatedRole;
    }
    throw new RoleNotFoundException(roleId);
  }

  async deleteOne(roleId: number): Promise<RoleEntity[]> {
    const roleToRemove = await this.roleRepository.find({ id: roleId });
    return await this.roleRepository.remove(roleToRemove);
  }
}
