import { Injectable } from '@nestjs/common';
import { UserDTO } from './user.dto';
import { v4 as uuid } from 'uuid';
import { hashSync as bcryptHashSync } from 'bcrypt';

@Injectable()
export class UsersService {
  private readonly users: UserDTO[] = [];

  create(user: UserDTO) {
    user.id = uuid();
    user.passwd = bcryptHashSync(user.passwd, 10);
    this.users.push(user);
  }

  findByEmail(email: string): UserDTO | null {
    console.log(this.users);
    return this.users.find((user) => user.email == email);
  }
}
