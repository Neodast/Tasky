import {
  IsEmail,
  IsEnum,
  IsHash,
  IsOptional,
  IsPhoneNumber,
  IsString,
  IsUUID,
} from 'class-validator';
import { UserRoles } from 'src/common/enums/user-role.enum';

export class UpdateUserDto {
  @IsUUID(4)
  id: string;

  @IsOptional()
  @IsEmail({
    allow_utf8_local_part: false,
  })
  email: string;

  @IsOptional()
  @IsHash('SHA256', {
    message: 'Password incorectly hashed',
  })
  password: string;

  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  surname?: string;

  @IsOptional()
  @IsString()
  username: string;

  @IsOptional()
  @IsPhoneNumber()
  phoneNumber?: string;

  @IsOptional()
  @IsString()
  imageLink?: string;

  @IsOptional()
  isVerify: boolean;

  @IsOptional()
  @IsEnum(UserRoles)
  role: UserRoles;
}
