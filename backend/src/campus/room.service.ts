import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeepPartial } from 'typeorm';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { Room } from './entities/room.entity';
import { RoomNotFoundException } from './exceptions/room.exceptions';

@Injectable()
export class RoomService {
    constructor(
        @InjectRepository(Room)
        private readonly roomRepository: Repository<Room>
    ) {}

    async create(room: CreateRoomDto): Promise<Room> {
        const newRoom = this.roomRepository.create(room)
        return await this.roomRepository.save(newRoom)
    }

    async findAll(): Promise<Room[]> {
        return await this.roomRepository.find();
    }

    async findOneById(roomId: number): Promise<Room> {
        return await this.roomRepository.findOne({id: roomId})
    }

    async updateOne(roomId: number, updateRoom: DeepPartial<UpdateRoomDto>): Promise<Room> {
        await this.roomRepository.update({id: roomId}, updateRoom);
        const updatedRoom = await this.roomRepository.findOne(roomId);
        if (updatedRoom) {
            return updatedRoom
        } 
        throw new RoomNotFoundException(roomId);
    }

    async deleteOne(roomId: number): Promise<Room[]> {
        const roomToRemove = await this.roomRepository.find({id: roomId});
        return await this.roomRepository.remove(roomToRemove);
    }
}
