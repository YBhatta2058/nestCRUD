import { Injectable } from '@nestjs/common';
import { User } from 'src/colleges/entities/user.entity';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class UsersRepository extends Repository<User> {
  constructor(private dataSource: DataSource) {
    super(User, dataSource.createEntityManager());
  }

  async findOneByUsername(username: string): Promise<User | undefined> {
    return this.findOne({ where: { username } });
  }

  async createUser(username: string, password: string, email: string): Promise<User> {
    const user = this.create({ username, password, email });
    return this.save(user);
  }
}
