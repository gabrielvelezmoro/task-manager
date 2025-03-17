import { Injectable } from '@nestjs/common';
import { UserDTO } from './user.dto';
import { v4 as uuid } from 'uuid';
import { hashSync as bcryptHashSync } from 'bcrypt';
import { PrismaService } from '../prima.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class UsersService {
  private readonly prisma: PrismaService;

  create(user: Prisma.UserCreateInput) {
    user.id = uuid();
    user.passwd = bcryptHashSync(user.passwd, 10);
    this.prisma.user.create({ data: user });
  }

  findByEmail(email: string): UserDTO | null {
    return this.findByEmail(email);
  }
}
