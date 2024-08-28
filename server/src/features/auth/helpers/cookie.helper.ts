import { Injectable, Res } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Response } from 'express';
import { ACCESS_TOKEN_MAX_AGE } from '../constants/cookie-time.constant';

@Injectable()
export class CookieHelper {
  constructor(private configService: ConfigService) {}

  public async setCookie(
    @Res() response: Response,
    cookieName: string,
    cookie: string,
  ) {
    return response.cookie(cookieName, cookie, {
      httpOnly: true,
      maxAge: ACCESS_TOKEN_MAX_AGE,
      secure: this.configService.get<string>('node.env') === 'production',
      sameSite: 'strict',
    });
  }

  public async clearCookie(@Res() response: Response, cookieName: string) {
    return response.clearCookie(cookieName);
  }
}
