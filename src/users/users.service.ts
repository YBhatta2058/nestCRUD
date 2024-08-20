import { Injectable } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { User } from 'src/colleges/entities/user.entity';

@Injectable()
export class UsersService {
  constructor(private usersRepository: UsersRepository) {}

  async findOneByUsername(username: string): Promise<User | undefined> {
    return this.usersRepository.findOneByUsername(username);
  }

  async create(username: string, password: string, email: string): Promise<User> {
    return this.usersRepository.createUser(username, password, email);
  }
}
