import { Body, Controller, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserRequestDTO } from './user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @Post()
  async create(@Body() user: CreateUserRequestDTO) {
    const response = await this.usersService.create(user);
    return response;
  }
}
