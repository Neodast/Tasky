import { Type } from 'class-transformer';
import { IsNumber, IsOptional, IsPositive } from 'class-validator';

export class PaginationParamsDto {
  @IsOptional()
  @Type(() => Number)
  @IsNumber({ allowNaN: false })
  @IsPositive()
  limit: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber({ allowNaN: false })
  @IsPositive()
  skip: number;
}
