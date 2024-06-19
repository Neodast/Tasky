import { Body, Controller, Post, SerializeOptions } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterUserDto } from './dtos/register-user.dto';
import { PublicAccess } from './decorators/public-access.decorator';
import { UserPayloadDto } from './dtos/user-payload.dto';

@PublicAccess()
@Controller('auth')
@SerializeOptions({ strategy: 'excludeAll' })
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() userPayload: UserPayloadDto) {
    console.log(userPayload);
    return {
      accessToken: (await this.authService.login(userPayload)).accessToken,
    };
  }

  @Post('registration')
  async registration(@Body() userData: RegisterUserDto) {
    return await this.authService.registration(userData);
  }
}
