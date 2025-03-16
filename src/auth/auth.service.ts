import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { AuthResponseDTO } from './auth.dto';
import { compareSync as bcryptCompareSync } from 'bcrypt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  private jwtExpirationTimeInSeconds: number;
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {
    this.jwtExpirationTimeInSeconds = +this.configService.get<number>(
      'JWT_EXPIRATION_TIME',
    );
  }

  signIn(email: string, passwd: string): AuthResponseDTO {
    const foundUser = this.userService.findByEmail(email);

    console.log(foundUser);
    if (!foundUser || !bcryptCompareSync(passwd, foundUser.passwd)) {
      throw new UnauthorizedException();
    }

    const payload = { sub: foundUser.id, name: foundUser.name };

    const token = this.jwtService.sign(payload);

    return { token, expiresIn: this.jwtExpirationTimeInSeconds };
  }
}
