import { Controller, Get, Param, Put, Body, Delete, Post, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { CreateRoleDto } from "./dto/create-role.dto";
import { UpdateRoleDto } from "./dto/update-role.dto";
import { RoleEntity } from "./entities/role.entity";
import { RoleService } from "./role.service";

@Controller('role')
@UseGuards(JwtAuthGuard)
export class RoleController {
    constructor(
        private readonly roleService: RoleService,
    ) {}

    @Post()
    async create(@Body() createRoleDto: CreateRoleDto): Promise<RoleEntity> {
        return await this.roleService.create(createRoleDto)
    }

    @Get()
    async findAll(): Promise<RoleEntity[]> {
        return await this.roleService.findAll()
    }

    @Get(':id')
    async findOneById(@Param('id') roleId: number): Promise<RoleEntity> {
        return await this.roleService.findOneById(roleId)
    }

    @Put(':id')
    async update(@Param('id') roleId: number, @Body() updateRoleDto: UpdateRoleDto): Promise<RoleEntity> {
        return await this.roleService.updateOne(roleId, updateRoleDto);
    }

    @Delete(':id')
    async remove(@Param('id') roleId: number): Promise<RoleEntity[]> {
        return await this.roleService.deleteOne(roleId);
    }
}