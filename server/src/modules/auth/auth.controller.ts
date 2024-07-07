import {
  Body,
  Controller,
  Get,
  Inject,
  LoggerService,
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

@PublicAccess()
@Controller('auth')
@SerializeOptions({ strategy: 'excludeAll' })
export class AuthController {
  constructor(
    private authService: AuthService,
    @Inject(WINSTON_MODULE_NEST_PROVIDER) private loggerService: LoggerService,
  ) {}

  @UseInterceptors(CookieInterceptor)
  @Post('login')
  async login(@Body() loginData: LoginUserDto) {
    const accessToken = await this.authService.login(loginData);
    this.loggerService.log({
      message: 'User succesfully login',
      level: 'info',
      context: 'AuthController.login',
    });
    return { accessToken: accessToken };
  }

  @Post('registration')
  async registration(@Body() registrationData: RegistrationUserDto) {
    const accessToken = await this.authService.registration(registrationData);
    this.loggerService.log({
      message: 'User succesfully register',
      level: 'info',
      context: 'AuthController.registration',
    });
    return { accessToken: accessToken };
  }

  @UseInterceptors(CookieInterceptor)
  @Get('refresh')
  async refresh(@Cookies('accessToken') accessToken: string) {
    const newAccessToken = await this.authService.refresh(accessToken);
    return { accessToken: newAccessToken };
  }
}
