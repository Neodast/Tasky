import {
  IsEmail,
  IsHash,
  IsOptional,
  IsPhoneNumber,
  IsString,
} from 'class-validator';

export class CreateUserDto {
  @IsEmail({
    allow_utf8_local_part: false,
  })
  email: string;

  @IsHash('SHA256', {
    message: 'Password incorrectly hashed',
  })
  password: string;

  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  surname?: string;

  @IsString()
  username: string;

  @IsOptional()
  @IsPhoneNumber()
  phoneNumber?: string;

  @IsOptional()
  @IsString()
  iconLink?: string;
}
