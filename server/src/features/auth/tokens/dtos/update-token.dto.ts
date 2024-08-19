import { IsJWT, IsOptional, IsString, IsUUID } from 'class-validator';

export class UpdateTokenDto {
  @IsString()
  @IsJWT()
  refreshToken: string;

  @IsOptional()
  @IsUUID(4)
  userId?: string;
}
