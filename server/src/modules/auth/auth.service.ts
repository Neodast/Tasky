import {
  ConflictException,
  Inject,
  Injectable,
  LoggerService,
  UnauthorizedException,
} from '@nestjs/common';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { UserService } from 'src/modules/user/user.service';
import { UserPayloadDto } from './dtos/user-payload.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { AccessToken } from 'src/common/types/access-token.type';
import { RegistrationUserDto } from './dtos/register-user.dto';
import { LoginUserDto } from './dtos/login-user.dto';
import { VerifyUserDto } from './dtos/verify-user.dto';

@Injectable()
export class AuthService {
  constructor(
    @Inject(WINSTON_MODULE_NEST_PROVIDER) private loggerService: LoggerService,
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  private async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 4);
  }

  public async verifyUser(payload: UserPayloadDto): Promise<VerifyUserDto> {
    const user = await this.userService.get({
      where: { email: payload.email },
    });

    const passwordIsValid = await bcrypt.compare(
      payload.password,
      user.password,
    );

    if (!passwordIsValid && payload.password !== user.password) {
      this.loggerService.error({
        message: 'Password is not valid',
        level: 'error',
        context: 'AuthService.verify',
      });
      throw new UnauthorizedException('Password is not valid');
    }
    return user;
  }

  async login(loginData: LoginUserDto): Promise<AccessToken> {
    const user = await this.userService.get({
      where: { email: loginData.email },
    });
    const payload = {
      email: user.email,
      password: user.password,
      id: user.id,
      role: user.role,
    };
    this.loggerService.log({
      message: 'User succesfully login',
      level: 'info',
      context: 'AuthService.login',
    });
    return { accessToken: this.jwtService.sign(payload) };
  }

  async registration(
    registrationData: RegistrationUserDto,
  ): Promise<AccessToken> {
    const existingUser = await this.userService.getByEmail(
      registrationData.email,
    );
    if (existingUser) {
      throw new ConflictException('Email already exists');
    }
    const hashedPassword = await this.hashPassword(registrationData.password);
    const userSecureData: RegistrationUserDto = {
      ...registrationData,
      password: hashedPassword,
    };
    const createdUser = await this.userService.create(userSecureData);
    this.loggerService.log({
      message: 'User succesfully register',
      level: 'info',
      context: 'AuthService.registration',
    });
    return this.login(createdUser);
  }
}
