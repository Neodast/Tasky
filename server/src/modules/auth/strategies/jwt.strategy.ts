import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { VerifyUserDto } from '../dtos/user-payload.dto';
import { AuthService } from '../auth.service';
import { UserPayloadDto } from '../dtos/verify-user.dto';
import { Serialize } from 'src/common/decorators/serialize.decorator';

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

  @Serialize(VerifyUserDto)
  async validate(payload: VerifyUserDto): Promise<UserPayloadDto> {
    const user = await this.authService.verifyUser(payload);
    return user; //TODO add serializetion here and in local strategy
  }
}
