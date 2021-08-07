import { Injectable } from '@nestjs/common';
import { DeepPartial, DeleteResult, Repository, UpdateResult } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../../../models/user/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async user(id: number): Promise<User | null> {
    return this.usersRepository.findOne({
      where: {
        id,
      },
    });
  }

  async users(params: {
    skip?: number;
    take?: number;
    where?: any;
    order?: any;
  }): Promise<User[]> {
    const { skip, take, where, order } = params;
    return this.usersRepository.find({
      skip,
      take,
      where,
      order,
    });
  }

  async createUser(data: DeepPartial<User>): Promise<User> {
    return this.usersRepository.create({
      ...data,
    });
  }

  async updateUser(params: { id: number; data: User }): Promise<UpdateResult> {
    const { id, data } = params;
    return this.usersRepository.update(id, data);
  }

  async deleteUser(id: number): Promise<DeleteResult> {
    return this.usersRepository.delete(id);
  }
}
