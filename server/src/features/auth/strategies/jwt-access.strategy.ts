import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from '../auth.service';
import { UserPayloadDto } from '../dtos/user-payload.dto';
import { AuthJwtPayloadDto } from '../dtos/auth-jwt-payload.dto';

@Injectable()
export class JwtAccessStrategy extends PassportStrategy(
  Strategy,
  'jwt-access',
) {
  constructor(
    private configService: ConfigService,
    private authService: AuthService,
  ) {
    super({
      usernameField: 'email',
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('jwt.access.secret'),
    });
  }

  public async validate(payload: AuthJwtPayloadDto): Promise<UserPayloadDto> {
    const user: UserPayloadDto = payload.sub;
    return user;
  }
}
