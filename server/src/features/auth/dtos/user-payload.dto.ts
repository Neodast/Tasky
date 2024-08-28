import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { UserRoles } from 'src/common/enums/user-role.enum';

export class UserPayloadDto {
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
    example: 'user123',
    description: 'User nickname',
  })
  @Expose()
  username: string;

  @ApiProperty({
    example: 'admin',
    description: 'Global user role in app',
  })
  @Expose()
  role: UserRoles;
}
