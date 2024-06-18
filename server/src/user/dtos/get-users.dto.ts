import { Type } from 'class-transformer';
import { IsNumber, IsObject, IsOptional, IsString } from 'class-validator';

export class GetUsersDto {
  @IsOptional()
  @IsObject()
  where?: Record<string, string>;

  @IsOptional()
  @IsString()
  sortBy?: string;

  @Type(() => Number)
  @IsNumber({ allowNaN: false })
  take: number;

  @Type(() => Number)
  @IsNumber({ allowNaN: false })
  page: number;
}
