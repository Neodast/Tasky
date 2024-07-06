import { AuthService } from '../auth.service';
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { UserPayloadDto } from '../dtos/user-payload.dto';
import { VerifyUserDto } from '../dtos/verify-user.dto';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, 'local') {
  constructor(private authService: AuthService) {
    super({ usernameField: 'email' });
  }

  public async validate(payload: UserPayloadDto): Promise<VerifyUserDto> {
    const user = await this.authService.verifyUser(payload);
    return user;
  }
}
