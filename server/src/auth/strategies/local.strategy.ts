import { AuthService } from './../auth.service';
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { UserPayloadDto } from '../dtos/user-payload.dto';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, 'local') {
  constructor(private authService: AuthService) {
    super();
  }

  public async validate(payload: UserPayloadDto): Promise<any> {
    return await this.authService.verifyUser(payload);
  }
}
