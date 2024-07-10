import {
  Body,
  Controller,
  Get,
  Inject,
  Post,
  SerializeOptions,
  UseInterceptors,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegistrationUserDto } from './dtos/register-user.dto';
import { PublicAccess } from './decorators/public-access.decorator';
import { CookieInterceptor } from './interceptors/cookie.interceptor';
import { LoginUserDto } from './dtos/login-user.dto';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { Cookies } from 'src/common/decorators/cookie.decorator';
import { AccessToken } from 'src/common/types/access-token.type';
import { Logger } from 'winston';

@PublicAccess()
@Controller('auth')
@SerializeOptions({ strategy: 'excludeAll' })
export class AuthController {
  constructor(
    private authService: AuthService,
    @Inject(WINSTON_MODULE_NEST_PROVIDER) private logger: Logger,
  ) {}

  @UseInterceptors(CookieInterceptor)
  @Post('login')
  public async login(
    @Body() loginData: LoginUserDto,
  ): Promise<Record<string, AccessToken>> {
    const accessToken = await this.authService.login(loginData);
    this.logger.log({
      message: 'User successfully login',
      level: 'info',
      context: 'AuthController.login',
    });
    return { accessToken: accessToken };
  }

  @Post('registration')
  async registration(
    @Body() registrationData: RegistrationUserDto,
  ): Promise<Record<string, AccessToken>> {
    const accessToken = await this.authService.registration(registrationData);
    this.logger.log({
      message: 'User successfully register',
      level: 'info',
      context: 'AuthController.registration',
    });
    return { accessToken: accessToken };
  }

  @UseInterceptors(CookieInterceptor)
  @Get('refresh')
  public async refresh(
    @Cookies('accessToken') accessToken: string,
  ): Promise<Record<string, AccessToken>> {
    const newAccessToken = await this.authService.refresh(accessToken);
    this.logger.log({
      message: 'User successfully refreshed token',
      level: 'info',
      context: 'AuthController.refresh',
    });
    return { accessToken: newAccessToken };
  }
}
