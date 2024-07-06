import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserPayloadDto } from '../dtos/user-payload.dto';
import { AuthService } from '../auth.service';
import { VerifyUserDto } from '../dtos/verify-user.dto';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    private configService: ConfigService,
    private authService: AuthService,
  ) {
    super({
      usernameField: 'email',
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('jwt.secret'),
    });
  }

  async validate(payload: UserPayloadDto): Promise<VerifyUserDto> {
    const user = await this.authService.verifyUser(payload);
    return user; //TODO add serializetion here and in local strategy
  }
}
