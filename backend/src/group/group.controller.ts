import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { GroupService } from './group.service';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import { GroupEntity } from './entities/group.entity';

@Controller('group')
export class GroupController {
    constructor(
        private readonly groupService: GroupService,
    ) {}

    @Post()
    async create(@Body() createGroupDto: CreateGroupDto): Promise<GroupEntity> {
        console.log(createGroupDto)
        return await this.groupService.create(createGroupDto)
    }

    @Get()
    async findAll(): Promise<GroupEntity[]> {
        return await this.groupService.findAll()
    }

    @Get(':id')
    async findOneById(@Param('id') groupId: number): Promise<GroupEntity> {
        return await this.groupService.findOneById(groupId)
    }

    @Put(':id')
    async update(@Param('id') groupId: number, @Body() updateGroupDto: UpdateGroupDto): Promise<GroupEntity> {
        return await this.groupService.updateOne(groupId, updateGroupDto);
    }

    @Delete(':id')
    async remove(@Param('id') groupId: number): Promise<GroupEntity[]> {
        return await this.groupService.deleteOne(groupId);
    }
}
