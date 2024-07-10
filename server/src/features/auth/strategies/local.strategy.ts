import { AuthService } from '../auth.service';
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { VerifyUserDto } from '../dtos/user-payload.dto';
import { UserPayloadDto } from '../dtos/verify-user.dto';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, 'local') {
  constructor(private authService: AuthService) {
    super({ usernameField: 'email' });
  }

  public async validate(payload: VerifyUserDto): Promise<UserPayloadDto> {
    const user = await this.authService.verifyUser(payload);
    return user;
  }
}
