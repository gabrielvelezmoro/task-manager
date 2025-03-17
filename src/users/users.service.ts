import { Injectable } from '@nestjs/common';
import { UserDTO } from './user.dto';
import { v4 as uuid } from 'uuid';
import { hashSync as bcryptHashSync } from 'bcrypt';
import { PrismaService } from '../prisma.service';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async create(user: UserDTO) {
    user.id = uuid();
    user.passwd = bcryptHashSync(user.passwd, 10);
    const newUser = await this.prisma.user.create({ data: user });
    return newUser;
  }

  async findByEmail(email: string): Promise<UserDTO | null> {
    const user = await this.prisma.user.findFirst({ where: { email } });
    return user;
  }
}
