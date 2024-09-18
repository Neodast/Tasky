import {
  IsEmail,
  IsOptional,
  IsPhoneNumber,
  IsString,
  IsStrongPassword,
} from 'class-validator';

export class RegistrationUserDto {
  @IsEmail({
    allow_utf8_local_part: false,
  })
  email: string;

  @IsStrongPassword({
    minNumbers: 1,
    minLowercase: 1,
    minUppercase: 1,
    minLength: 6,
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
