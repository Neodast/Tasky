import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
import { UsersFiltersParamsDto } from './users-filters-params.dto';

export class GetUsersDto extends UsersFiltersParamsDto {
  @ApiProperty({
    example: 'sortBy=username',
    description:
      'Parameter that sets the order of elements in users db request',
    required: false,
  })
  @IsOptional()
  @IsString()
  sortBy?: string;
}
