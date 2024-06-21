import {
  Body,
  Controller,
  Post,
  SerializeOptions,
  UseInterceptors,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterUserDto } from './dtos/register-user.dto';
import { PublicAccess } from './decorators/public-access.decorator';
import { UserPayloadDto } from './dtos/user-payload.dto';
import { CookieInterceptor } from './interceptors/cookie.interceptor';
@PublicAccess()
@Controller('auth')
@SerializeOptions({ strategy: 'excludeAll' })
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseInterceptors(CookieInterceptor)
  @Post('login')
  async login(@Body() userPayload: UserPayloadDto) {
    return (await this.authService.login(userPayload)).accessToken;
  }

  @Post('registration')
  async registration(@Body() userData: RegisterUserDto) {
    return await this.authService.registration(userData);
  }
}
