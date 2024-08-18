import { Injectable } from '@nestjs/common';
import { User } from 'src/features/user/user.entity';
import { UserPayloadDto } from '../dtos/user-payload.dto';

@Injectable()
export class AuthMapper {
  public mapUserToUserPayloadDto(user: User): UserPayloadDto {
    return {
      id: user.id,
      email: user.email,
      username: user.username,
      // password: user.password,
      role: user.role,
    };
  }
}
