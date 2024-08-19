import {
  Body,
  Controller,
  Get,
  Inject,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegistrationUserDto } from './dtos/register-user.dto';
import { JwtAccessSetCookieInterceptor } from './interceptors/jwt-access-set-cookie.interceptor';
import { LoginUserDto } from './dtos/login-user.dto';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { AccessToken } from 'src/features/auth/types/access-token.type';
import { Logger } from 'winston';
import { RefreshToken } from './types/refresh-token.type';
import { PublicAccess } from './decorators/public-access.decorator';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { JwtRefreshAuthGuard } from './guards/jwt-refresh-auth.guard';
import { CurrentUser } from './decorators/current-user.decorator';
import { UserPayloadDto } from './dtos/user-payload.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    @Inject(WINSTON_MODULE_NEST_PROVIDER) private logger: Logger,
  ) {}

  @PublicAccess()
  @UseInterceptors(JwtAccessSetCookieInterceptor)
  @UseGuards(LocalAuthGuard)
  @Post('login')
  public async login(
    @Body() loginData: LoginUserDto,
  ): Promise<AccessToken & RefreshToken> {
    const tokens = await this.authService.login(loginData);
    this.logger.log({
      message: `User with email ${loginData.email} successfully login`,
      level: 'info',
      context: 'AuthController.login',
    });
    return tokens;
  }

  @PublicAccess()
  @Post('registration')
  public async registration(
    @Body() registrationData: RegistrationUserDto,
  ): Promise<AccessToken> {
    const accessToken = await this.authService.registration(registrationData);
    this.logger.log({
      message: `User ${registrationData.username} successfully register`,
      level: 'info',
      context: 'AuthController.registration',
    });
    return accessToken;
  }

  @UseInterceptors(JwtAccessSetCookieInterceptor)
  @UseGuards(JwtRefreshAuthGuard)
  @Get('refresh')
  public async refresh(
    @CurrentUser() user: UserPayloadDto,
  ): Promise<AccessToken> {
    const newAccessToken = await this.authService.refresh(user.id);
    this.logger.log({
      message: `User ${user.username} successfully refreshed token`,
      level: 'info',
      context: 'AuthController.refresh',
    });
    return newAccessToken;
  }
}
