import {
  Body,
  Controller,
  Post,
  SerializeOptions,
  UseInterceptors,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegistrationUserDto } from './dtos/register-user.dto';
import { PublicAccess } from './decorators/public-access.decorator';
import { CookieInterceptor } from './interceptors/cookie.interceptor';
import { LoginUserDto } from './dtos/login-user.dto';

@PublicAccess()
@Controller('auth')
@SerializeOptions({ strategy: 'excludeAll' })
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseInterceptors(CookieInterceptor)
  @Post('login')
  async login(@Body() loginData: LoginUserDto) {
    return (await this.authService.login(loginData)).accessToken;
  }

  @Post('registration')
  async registration(@Body() registrationData: RegistrationUserDto) {
    return await this.authService.registration(registrationData);
  }
}
