import { IsString } from 'class-validator';

export class UserDTO {
  id: string;
  name: string;
  email: string;
  passwd: string;
}

export class CreateUserRequestDTO {
  @IsString()
  name: string;

  @IsString()
  email: string;

  @IsString()
  passwd: string;
}
