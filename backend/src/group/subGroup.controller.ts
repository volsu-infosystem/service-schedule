import { Controller, Post, Body, Get, Param, Put, Delete } from "@nestjs/common";
import { CreateSubGroupDto } from "./dto/create-sub-group.dto";
import { UpdateSubGroupDto } from "./dto/update-sub-group.dto";
import { SubGroupEntity } from "./entities/subGroup.entity";
import { SubGroupService } from "./subGroup.service";

@Controller('subgroup')
export class SubGroupController {
    constructor(
        private readonly subgroupService: SubGroupService,
    ) {}

    @Post()
    async create(@Body() createSubGroupDto: CreateSubGroupDto): Promise<SubGroupEntity> {
        console.log(createSubGroupDto)
        return await this.subgroupService.create(createSubGroupDto)
    }

    @Get()
    async findAll(): Promise<SubGroupEntity[]> {
        return await this.subgroupService.findAll()
    }

    @Get(':id')
    async findOneById(@Param('id') subgroupId: number): Promise<SubGroupEntity> {
        return await this.subgroupService.findOneById(subgroupId)
    }

    @Put(':id')
    async update(@Param('id') subgroupId: number, @Body() updateSubGroupDto: UpdateSubGroupDto): Promise<SubGroupEntity> {
        return await this.subgroupService.updateOne(subgroupId, updateSubGroupDto);
    }

    @Delete(':id')
    async remove(@Param('id') subgroupId: number): Promise<SubGroupEntity[]> {
        return await this.subgroupService.deleteOne(subgroupId);
    }
}
