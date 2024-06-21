import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, SelectQueryBuilder } from 'typeorm';
import { User } from '../../shared/entities/index-entities';
import { CreateUserDto } from '../../shared/dtos/index-dtos';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = this.userRepository.create(createUserDto);
    return await this.userRepository.save(user);
  }

  async findAll(): Promise<User[]> {
    const queryBuilder = this.userRepository.createQueryBuilder('user');
    this.addRelationsToQueryBuilder(queryBuilder);
    return await queryBuilder.getMany();
  }

  async findOne(id: number): Promise<User> {
    const queryBuilder = this.userRepository.createQueryBuilder('user');
    this.addRelationsToQueryBuilder(queryBuilder);
    queryBuilder.where('user.id = :id', { id });
    const user = await queryBuilder.getOne();
    if (!user) {
      throw new NotFoundException(`User's' ID ${id} not found`);
    }
    return user;
  }

  async update(id: number, updateUserDto: CreateUserDto): Promise<User> {
    const user = await this.userRepository.preload({
      id,
      ...updateUserDto,
    });
    if (!user) {
      throw new NotFoundException(`User's' ID ${id} not found`);
    }
    return await this.userRepository.save(user);
  }

  async remove(id: number): Promise<void> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException(`User's' ID ${id} not found`);
    }
    await this.userRepository.softRemove(user);
  }

  private addRelationsToQueryBuilder(
    queryBuilder: SelectQueryBuilder<User>,
  ): void {
    queryBuilder.leftJoinAndSelect('user.reservations', 'reservation');
    queryBuilder.leftJoinAndSelect('user.workspaces', 'workspace');
  }
}
