import { Injectable } from '@nestjs/common';
import { UserEntity } from 'src/features/users/user.entity';
import { UserPayloadDto } from '../dtos/user-payload.dto';

@Injectable()
export class AuthMapper {
  public mapUserToUserPayloadDto(user: UserEntity): UserPayloadDto {
    return {
      id: user.id,
      email: user.email,
      username: user.username,
      role: user.role,
    };
  }
}
