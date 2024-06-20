import {
  ConflictException,
  Inject,
  Injectable,
  LoggerService,
  UnauthorizedException,
} from '@nestjs/common';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { UserService } from 'src/user/user.service';
import { UserPayloadDto } from './dtos/user-payload.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { AccessToken } from 'src/utils/types/access-token.type';
import { RegisterUserDto } from './dtos/register-user.dto';

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

  public async verifyUser(payload: UserPayloadDto) {
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
        context: 'AuthService',
      });
      throw new UnauthorizedException('Password is not valid');
    }
    return user;
  }

  async login(userPayload: UserPayloadDto): Promise<AccessToken> {
    const user = await this.userService.get({
      where: { email: userPayload.email },
    });
    const payload = { email: user.email, password: user.password, id: user.id };
    return { accessToken: this.jwtService.sign(payload) };
  }

  async registration(userData: RegisterUserDto): Promise<AccessToken> {
    const existingUser = await this.userService.getByEmail(userData.email);
    if (existingUser) {
      throw new ConflictException('Email already exists');
    }
    const hashedPassword = await this.hashPassword(userData.password);
    const userSecureData: RegisterUserDto = {
      ...userData,
      password: hashedPassword,
    };
    const createdUser = await this.userService.create(userSecureData);
    return this.login(createdUser);
  }
}
