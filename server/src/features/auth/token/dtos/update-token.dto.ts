import { IsOptional, IsString, IsUUID } from 'class-validator';

export class UpdateTokenDto {
  @IsOptional()
  @IsUUID(4)
  id?: string;

  @IsString()
  refreshToken: string;

  @IsOptional()
  @IsUUID(4)
  userId?: string;
}
