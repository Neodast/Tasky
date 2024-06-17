import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';

export class UserPayloadDto {
  @IsString()
  @IsEmail()
  email: string;

  @MinLength(6)
  @MaxLength(20)
  password: string;
}
