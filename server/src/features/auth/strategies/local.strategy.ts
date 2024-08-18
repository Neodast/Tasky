import { AuthService } from '../auth.service';
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { UserPayloadDto } from '../dtos/user-payload.dto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, 'local') {
  constructor(
    private authService: AuthService,
    private configService: ConfigService,
  ) {
    super({
      usernameField: 'email',
    });
  }

  public async validate(
    email: string,
    password: string,
  ): Promise<UserPayloadDto> {
    const user = await this.authService.verifyUser({
      email: email,
      password: password,
    });
    return user;
  }
}
