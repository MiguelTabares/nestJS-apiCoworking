import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Room } from '../../shared/entities/index-entities';
import { CreateRoomDto } from '../../shared/dtos/index-dtos';

@Injectable()
export class RoomService {
  constructor(
    @InjectRepository(Room)
    private readonly roomRepository: Repository<Room>,
  ) {}

  async create(createRoomDto: CreateRoomDto): Promise<Room> {
    const room = this.roomRepository.create(createRoomDto);
    return await this.roomRepository.save(room);
  }

  async findAll(): Promise<Room[]> {
    return this.roomRepository.find();
  }

  async findOne(id: number): Promise<Room> {
    const room = await this.roomRepository.findOne({ where: { id } });
    if (!room) {
      throw new NotFoundException(`Room's ID ${id} not found`);
    }
    return room;
  }

  async update(id: number, updateRoomDto: CreateRoomDto): Promise<Room> {
    const room = await this.roomRepository.preload({
      id,
      ...updateRoomDto,
    });
    if (!room) {
      throw new NotFoundException(`Room's ID ${id} not found`);
    }
    return await this.roomRepository.save(room);
  }

  async remove(id: number): Promise<void> {
    const room = await this.roomRepository.findOne({ where: { id } });
    if (!room) {
      throw new NotFoundException(`Room's ID ${id} not found`);
    }
    await this.roomRepository.softRemove(room);
  }
}
