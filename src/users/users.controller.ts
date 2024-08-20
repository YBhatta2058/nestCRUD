import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from 'src/colleges/entities/user.entity';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body('username') username: string, @Body('password') password: string, @Body('email') email: string): Promise<User> {
    return this.usersService.create(username, password, email);
  }

  @Get(':username')
  async findOne(@Param('username') username: string): Promise<User | undefined> {
    return this.usersService.findOneByUsername(username);
  }
}