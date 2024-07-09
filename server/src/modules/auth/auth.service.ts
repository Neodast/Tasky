import {
  ConflictException,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { UsersService } from 'src/modules/user/users.service';
import { VerifyUserDto } from './dtos/user-payload.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { AccessToken } from 'src/common/types/access-token.type';
import { RegistrationUserDto } from './dtos/register-user.dto';
import { UserPayloadDto } from './dtos/verify-user.dto';
import { LoginUserDto } from './dtos/login-user.dto';
import { Logger } from 'winston';

@Injectable()
export class AuthService {
  constructor(
    @Inject(WINSTON_MODULE_NEST_PROVIDER) private logger: Logger,
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  private async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 4);
  }

  private async getAccessToken(email: string): Promise<AccessToken> {
    const user = await this.userService.getOneByCriteria({
      where: { email: email },
    });
    const payload = {
      email: user.email,
      password: user.password,
      id: user.id,
      role: user.role,
    };
    return this.jwtService.sign(payload);
  }

  public async verifyUser(userData: VerifyUserDto): Promise<UserPayloadDto> {
    const user = await this.userService.getOneByCriteria({
      where: { email: userData.email },
    });

    const passwordIsValid = await bcrypt.compare(
      userData.password,
      user.password,
    );

    if (!passwordIsValid && userData.password !== user.password) {
      this.logger.log({
        message: 'Password is not valid',
        level: 'error',
        context: 'AuthService.verify',
      });
      throw new UnauthorizedException('Password is not valid');
    }
    return user;
  }

  public async login(loginData: LoginUserDto): Promise<AccessToken> {
    return this.getAccessToken(loginData.email);
  }

  async registration(
    registrationData: RegistrationUserDto,
  ): Promise<AccessToken> {
    const existingUser = await this.userService.findOneByEmail(
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
    return this.getAccessToken(createdUser.email);
  }

  public async refresh(accessToken: AccessToken): Promise<AccessToken> {
    const userPayload: UserPayloadDto =
      await this.jwtService.decode(accessToken);
    const user = await this.userService.findOneByEmail(userPayload.email);
    return this.getAccessToken(user.email);
  }
}
