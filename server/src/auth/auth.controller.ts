import {
  Body,
  Controller,
  HttpStatus,
  Post,
  Res,
  SerializeOptions,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterUserDto } from './dtos/register-user.dto';
import { PublicAccess } from './decorators/public-access.decorator';
import { UserPayloadDto } from './dtos/user-payload.dto';
import { CookieHelper } from './helpers/cookie.helper';
import { Response } from 'express';
// TODO add cookie integration
@PublicAccess()
@Controller('auth')
@SerializeOptions({ strategy: 'excludeAll' })
export class AuthController {
  constructor(
    private authService: AuthService,
    private cookieHelper: CookieHelper,
  ) {}

  @Post('login')
  async login(@Body() userPayload: UserPayloadDto, @Res() res: Response) {
    const accessToken = (await this.authService.login(userPayload)).accessToken;
    await this.cookieHelper.setCookie(res, 'accessToken', accessToken);
    res.status(HttpStatus.OK).send();
  }

  @Post('registration')
  async registration(@Body() userData: RegisterUserDto) {
    return await this.authService.registration(userData);
  }
}
