import {
  Body,
  Controller,
  Get,
  HttpStatus,
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
import { JwtAccessClearCookieInterceptor } from './interceptors/jwt-access-clear-cookie.interceptor';
import { JwtAccessAuthGuard } from './guards/jwt-access-auth.guard';
import { ApiBearerAuth, ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    @Inject(WINSTON_MODULE_NEST_PROVIDER) private logger: Logger,
  ) {}

  @Post('login')
  @ApiBody({ type: LoginUserDto })
  @ApiResponse({
    example: `accessToken : {access},refreshToken : {refresh}`,
    status: HttpStatus.OK,
  })
  @PublicAccess()
  @UseInterceptors(JwtAccessSetCookieInterceptor)
  @UseGuards(LocalAuthGuard)
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

  @Get('logout')
  @UseInterceptors(JwtAccessClearCookieInterceptor)
  @UseGuards(JwtAccessAuthGuard)
  public async logout(@CurrentUser() user: UserPayloadDto): Promise<void> {
    this.authService.logout(user.id);
    this.logger.log({
      message: `User ${user.username} successfully logout`,
      level: 'info',
      context: 'AuthController.logout',
    });
  }

  @Post('registration')
  @ApiBody({ type: UserPayloadDto })
  @ApiResponse({
    example: 'accessToken: {access}',
    status: HttpStatus.CREATED,
  })
  @PublicAccess()
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

  @Get('refresh')
  @ApiBearerAuth('refreshToken')
  @ApiResponse({
    example: 'accessToken: {access}',
    status: HttpStatus.OK,
  })
  @UseInterceptors(JwtAccessSetCookieInterceptor)
  @UseGuards(JwtRefreshAuthGuard)
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
