import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { RoomService } from './room.service';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { RoomEntity } from './entities/room.entity';

@Controller('room')
export class RoomController {
    constructor(
        private readonly roomService: RoomService,
    ) {}

    @Post()
    async create(@Body() createRoomDto: CreateRoomDto): Promise<RoomEntity> {
        console.log(createRoomDto)
        return await this.roomService.create(createRoomDto)
    }

    @Get()
    async findAll(): Promise<RoomEntity[]> {
        return await this.roomService.findAll()
    }

    @Get(':id')
    async findOneById(@Param('id') roomId: number): Promise<RoomEntity> {
        return await this.roomService.findOneById(roomId)
    }

    @Put(':id')
    async update(@Param('id') roomId: number, @Body() updateRoomDto: UpdateRoomDto): Promise<RoomEntity> {
        return await this.roomService.updateOne(roomId, updateRoomDto);
    }

    @Delete(':id')
    async remove(@Param('id') roomId: number): Promise<RoomEntity[]> {
        return await this.roomService.deleteOne(roomId);
    }
}
