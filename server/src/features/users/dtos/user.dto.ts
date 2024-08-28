import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { UserRoles } from 'src/common/enums/user-role.enum';

export class UserDto {
  @ApiProperty({
    example: '3e45b076-6f44-4e27-b6de-8a001f8c4c14',
    description: 'User id',
  })
  @Expose()
  id: string;

  @ApiProperty({
    example: 'user@gmail.com',
    description: 'User email',
  })
  @Expose()
  email: string;

  @ApiProperty({
    example: 'Mark',
    description: 'User first name',
  })
  @Expose()
  name: string;

  @ApiProperty({
    example: 'Wilson',
    description: 'User last name',
  })
  @Expose()
  surname: string;

  @ApiProperty({
    example: 'user123',
    description: 'User nickname',
  })
  @Expose()
  username: string;

  @ApiProperty({
    example: '+380958965014',
    description: 'User phone number',
  })
  @Expose()
  phoneNumber: string;

  @ApiProperty({
    example: 'someLink/d4d4',
    description: 'Link to photo placed in cloud storage',
  })
  @Expose()
  iconLink: string;

  @ApiProperty({
    example: '05.11.25.12:30:46',
    description: 'User account creation date',
  })
  @Expose()
  creationDate: Date;

  @ApiProperty({
    example: 'true',
    description: 'User verify stage',
  })
  @Expose()
  isVerified: boolean;

  @ApiProperty({
    example: 'admin',
    description: 'Global user role in app',
  })
  @Expose()
  role: UserRoles;
}
