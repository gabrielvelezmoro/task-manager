import { Injectable } from '@nestjs/common';
import { CreateUserRequestDTO, UserDTO } from './user.dto';
import { hashSync as bcryptHashSync } from 'bcrypt';
import { PrismaService } from '../prisma.service';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async create(user: CreateUserRequestDTO) {
    user.passwd = bcryptHashSync(user.passwd, 10);
    const newUser = await this.prisma.user.create({
      data: user,
      select: {
        id: true,
        email: true,
        name: true,
      },
    });

    return newUser;
  }

  async findByEmail(email: string): Promise<UserDTO | null> {
    const user = await this.prisma.user.findFirst({ where: { email } });
    return user;
  }
}
