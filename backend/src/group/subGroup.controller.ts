import { Controller, Post, Body, Get, Param, Put, Delete } from "@nestjs/common";
import { CreateSubGroupDto } from "./dto/create-sub-group.dto";
import { UpdateSubGroupDto } from "./dto/update-sub-group.dto";
import { SubGroup } from "./entities/subGroup.entity";
import { SubGroupService } from "./subGroup.service";

@Controller('subgroup')
export class SubGroupController {
    constructor(
        private readonly subgroupService: SubGroupService,
    ) {}

    @Post()
    async create(@Body() createSubGroupDto: CreateSubGroupDto): Promise<SubGroup> {
        console.log(createSubGroupDto)
        return await this.subgroupService.create(createSubGroupDto)
    }

    @Get()
    async findAll(): Promise<SubGroup[]> {
        return await this.subgroupService.findAll()
    }

    @Get(':id')
    async findOneById(@Param('id') subgroupId: number): Promise<SubGroup> {
        return await this.subgroupService.findOneById(subgroupId)
    }

    @Put(':id')
    async update(@Param('id') subgroupId: number, @Body() updateSubGroupDto: UpdateSubGroupDto): Promise<SubGroup> {
        return await this.subgroupService.updateOne(subgroupId, updateSubGroupDto);
    }

    @Delete(':id')
    async remove(@Param('id') subgroupId: number): Promise<SubGroup[]> {
        return await this.subgroupService.deleteOne(subgroupId);
    }
}
