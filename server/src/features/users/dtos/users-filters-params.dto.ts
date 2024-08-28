import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
import { PaginationParamsDto } from 'src/common/dtos/pagination-params.dto';
import { UserRoles } from 'src/common/enums/user-role.enum';

export class UsersFiltersParamsDto extends PaginationParamsDto {
  @ApiProperty({
    example: 'user@gmail.com',
    description: 'User email',
    required: false,
  })
  @IsOptional()
  email?: string;

  @ApiProperty({
    example: 'Mark',
    description: 'User first name',
    required: false,
  })
  @IsOptional()
  name?: string;

  @ApiProperty({
    example: 'Wilson',
    description: 'User last name',
    required: false,
  })
  @IsOptional()
  surname?: string;

  @ApiProperty({
    example: 'user123',
    description: 'User nickname',
    required: false,
  })
  @IsOptional()
  username?: string;

  @ApiProperty({
    example: '05.11.25.12:30:46',
    description: 'User account creation date',
    required: false,
  })
  @IsOptional()
  creationDate?: Date;

  @ApiProperty({
    example: 'admin',
    description: 'Global user role in app',
    required: false,
  })
  @IsOptional()
  role?: UserRoles;
}
