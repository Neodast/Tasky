import {
  ConflictException,
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { UsersService } from 'src/features/user/users.service';
import { AuthLocalPayloadDto } from './dtos/auth-local-payload.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { AccessToken } from 'src/features/auth/types/access-token.type';
import { RegistrationUserDto } from './dtos/register-user.dto';
import { UserPayloadDto } from './dtos/user-payload.dto';
import { LoginUserDto } from './dtos/login-user.dto';
import { Logger } from 'winston';
import { TokenService } from './token/token.service';
import { RefreshToken } from './types/refresh-token.type';
import { AuthMapper } from './mappers/auth.mapper';

@Injectable()
export class AuthService {
  constructor(
    @Inject(WINSTON_MODULE_NEST_PROVIDER) private logger: Logger,
    private usersService: UsersService,
    private jwtService: JwtService,
    private tokenService: TokenService,
    private authMapper: AuthMapper,
  ) {}

  private async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 4);
  }

  public async verifyUser(
    userData: AuthLocalPayloadDto,
  ): Promise<UserPayloadDto> {
    const user = await this.usersService.getOneByCriteria({
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

  public async login(
    loginData: LoginUserDto,
  ): Promise<AccessToken & RefreshToken> {
    const user = await this.usersService.getOneByCriteria({
      where: { email: loginData.email },
    });
    const tokenEntity = await this.tokenService.findRefreshByUserId(user.id);
    const tokens = await this.tokenService.generateTokens(
      this.authMapper.mapUserToUserPayloadDto(user),
    );
    if (tokenEntity) {
      await this.tokenService.updateRefreshToken({
        userId: user.id,
        refreshToken: tokens.refreshToken,
      });
      return tokens;
    }
    await this.tokenService.saveRefreshToken(tokens.refreshToken, user.id);
    return tokens;
  }

  async registration(
    registrationData: RegistrationUserDto,
  ): Promise<AccessToken & RefreshToken> {
    const existingUser = await this.usersService.findOneByEmail(
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
    const createdUser = await this.usersService.create(userSecureData);
    const tokens = await this.tokenService.generateTokens(createdUser);
    this.tokenService.saveRefreshToken(tokens.refreshToken, createdUser.id);
    return tokens;
  }

  public async refresh(userId: string): Promise<AccessToken> {
    const dbToken = await this.tokenService.findRefreshByUserId(userId);
    if (!dbToken) {
      throw new NotFoundException('Refresh token is not found');
    }
    const user = await this.usersService.findOneByCriteria({
      where: { id: userId },
    });
    const tokens = await this.tokenService.generateTokens(user);
    return { accessToken: tokens.accessToken };
  }
}
