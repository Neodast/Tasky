import { Injectable, Res } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Response } from 'express';

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
      secure: this.configService.get<string>('node.env') === 'production',
      sameSite: 'strict',
    });
  }

  public async removeCookie() {}
}
