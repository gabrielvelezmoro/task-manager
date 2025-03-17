import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthResponseDTO } from './auth.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async signin(
    @Body('email') email: string,
    @Body('passwd') passwd: string,
  ): Promise<AuthResponseDTO> {
    return this.authService.signIn(email, passwd);
  }
}
