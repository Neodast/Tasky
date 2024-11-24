import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from '../auth.service';
import { UserPayloadDto } from '../dtos/user-payload.dto';
import { AuthJwtPayloadDto } from '../dtos/auth-jwt-payload.dto';
import { RefreshCookieExtractor } from '../extractors/cookie.extractor';

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh',
) {
  constructor(
    private configService: ConfigService,
    private authService: AuthService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([RefreshCookieExtractor]),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('jwt.refresh.secret'),
    });
  }

  public async validate(payload: AuthJwtPayloadDto): Promise<UserPayloadDto> {
    const user: UserPayloadDto = payload.sub;
    return user;
  }
}
