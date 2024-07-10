import { Type } from 'class-transformer';
import { IsNumber } from 'class-validator';
//TODO upgrade pagination(add limit and etc.)
export class PaginationParamsDto {
  @Type(() => Number)
  @IsNumber({ allowNaN: false })
  take: number;

  @Type(() => Number)
  @IsNumber({ allowNaN: false })
  page: number;
}
