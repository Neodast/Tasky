import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsStrongPassword } from 'class-validator';

export class LoginUserDto {
  @ApiProperty({
    example: 'user@gmail.com',
    description: 'User email',
  })
  @IsEmail({
    allow_utf8_local_part: false,
  })
  email: string;

  @ApiProperty({
    example: 'djW_52dP0',
    description: 'User password',
  })
  @IsStrongPassword({
    minNumbers: 1,
    minLowercase: 1,
    minUppercase: 1,
    minLength: 6,
  })
  password: string;
}
