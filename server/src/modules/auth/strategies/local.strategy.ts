import { AuthService } from '../auth.service';
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { UserPayloadDto } from '../dtos/user-payload.dto';
import { User } from 'src/modules/user/user.entity';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, 'local') {
  constructor(private authService: AuthService) {
    super({ usernameField: 'email' });
  }

  public async validate(payload: UserPayloadDto): Promise<User> {
    const user = await this.authService.verifyUser(payload);
    return user;
  }
}
