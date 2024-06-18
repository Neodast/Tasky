import { IsObject } from 'class-validator';

export class GetUserDto {
  @IsObject()
  where: Record<string, string>;
}
