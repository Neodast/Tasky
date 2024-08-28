import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber, IsOptional, IsPositive } from 'class-validator';

export class PaginationParamsDto {
  @ApiProperty({
    example: '5',
    description: 'Parameter that sets count of items in db request',
    required: false,
  })
  @IsOptional()
  @Type(() => Number)
  @IsNumber({ allowNaN: false })
  @IsPositive()
  limit?: number;

  @ApiProperty({
    example: '2',
    description: 'Parameter that sets number of skipped items in db request',
    required: false,
  })
  @IsOptional()
  @Type(() => Number)
  @IsNumber({ allowNaN: false })
  @IsPositive()
  skip?: number;
}
