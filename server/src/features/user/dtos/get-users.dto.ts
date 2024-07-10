import { IsObject, IsOptional, IsString } from 'class-validator';
import { PaginationParamsDto } from 'src/common/dtos/pagination-params.dto';

export class GetUsersDto extends PaginationParamsDto {
  @IsOptional()
  @IsObject()
  where?: Record<string, string>;

  @IsOptional()
  @IsString()
  sortBy?: string;
}
