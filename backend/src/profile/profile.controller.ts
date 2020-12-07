import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { profileTypeEnum } from './enums/profileType.enum';
import { CreateProfileDto, ProfileEntity, UpdateProfileDto } from './interfaces/profile.interface';
import { ProfileService } from './profile.service';

@Controller('profile')
export class ProfileController {
    constructor(
        private readonly profileService: ProfileService,
    ) {}

    @Post(':type?')
    async create(@Body() createProfileDto: CreateProfileDto, @Param('type') type?: profileTypeEnum): Promise<ProfileEntity> {
        console.log(createProfileDto)
        return await this.profileService.create(createProfileDto, type)
    }

    @Get(':type?')
    async findAll(@Param('type') type?: profileTypeEnum): Promise<ProfileEntity[]> {
        return await this.profileService.findAll(type)
    }

    @Get(':id/:type?')
    async findOneById(@Param('id') profileId: number, @Param('type') type?: profileTypeEnum): Promise<ProfileEntity> {
        return await this.profileService.findOneById(profileId, type)
    }

    @Put(':id/:type?')
    async update(@Param('id') profileId: number, @Body() updateProfileDto: UpdateProfileDto, @Param('type') type?: profileTypeEnum,): Promise<ProfileEntity> {
        return await this.profileService.updateOne(profileId, updateProfileDto, type);
    }

    @Delete(':id/:type?')
    async remove(@Param('id') profileId: number, @Param('type') type?: profileTypeEnum): Promise<ProfileEntity[]> {
        return await this.profileService.deleteOne(profileId, type);
    }
}

