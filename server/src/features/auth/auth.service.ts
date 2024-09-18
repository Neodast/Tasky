import {
  ConflictException,
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { UsersService } from 'src/features/users/users.service';
import { AuthLocalPayloadDto } from './dtos/auth-local-payload.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { AccessToken } from 'src/features/auth/types/access-token.type';
import { RegistrationUserDto } from './dtos/register-user.dto';
import { UserPayloadDto } from './dtos/user-payload.dto';
import { LoginUserDto } from './dtos/login-user.dto';
import { Logger } from 'winston';
import { TokensService } from './tokens/tokens.service';
import { RefreshToken } from './types/refresh-token.type';
import { AuthMapper } from './mappers/auth.mapper';
import { CookieHelper } from './helpers/cookie.helper';

@Injectable()
export class AuthService {
  constructor(
    @Inject(WINSTON_MODULE_NEST_PROVIDER) private logger: Logger,
    private usersService: UsersService,
    private jwtService: JwtService,
    private tokensService: TokensService,
    private authMapper: AuthMapper,
    private cookieHelper: CookieHelper,
  ) {}

  private async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 4);
  }

  public async verifyUser(
    userData: AuthLocalPayloadDto,
  ): Promise<UserPayloadDto> {
    const user = await this.usersService.getOneByCriteriaOrFail({
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
    const user = await this.usersService.getOneByCriteriaOrFail({
      where: { email: loginData.email },
    });
    const tokenEntity = await this.tokensService.getRefreshByUserId(user.id);
    const tokens = await this.tokensService.generateTokens(
      this.authMapper.mapUserToUserPayloadDto(user),
    );
    if (tokenEntity) {
      await this.tokensService.updateRefreshToken({
        userId: user.id,
        refreshToken: tokens.refreshToken,
      });
      return tokens;
    }
    await this.tokensService.saveRefreshToken(tokens.refreshToken, user.id);
    return tokens;
  }

  public async logout(userId: string): Promise<void> {
    const token = await this.tokensService.getRefreshByUserId(userId);
    if (!token) {
      this.logger.log({
        message: `Refresh token is not found`,
        level: 'error',
        context: 'AuthService.logout',
      });
      throw new NotFoundException('Refresh token is not found');
    }
    this.tokensService.deleteRefreshToken(token.refreshToken);
  }

  async registration(
    registrationData: RegistrationUserDto,
  ): Promise<AccessToken & RefreshToken> {
    const user = await this.usersService.getOneByCriteria({
      where: { email: registrationData.email },
    });
    if (user) {
      this.logger.log({
        message: `Email ${user.email} already exists`,
        level: 'error',
        context: 'AuthService.registration',
      });
      throw new ConflictException('Email already exists');
    }
    const hashedPassword = await this.hashPassword(registrationData.password);
    const userSecureData: RegistrationUserDto = {
      ...registrationData,
      password: hashedPassword,
    };
    const createdUser = await this.usersService.create(userSecureData);
    const tokens = await this.tokensService.generateTokens(createdUser);
    this.tokensService.saveRefreshToken(tokens.refreshToken, createdUser.id);
    return tokens;
  }

  public async refresh(userId: string): Promise<AccessToken> {
    const dbToken = await this.tokensService.getRefreshByUserId(userId);
    if (!dbToken) {
      throw new NotFoundException('Refresh token is not found');
    }
    const user = await this.usersService.getOneByCriteria({
      where: { id: userId },
    });

    if (!user) {
      this.logger.log({
        message: `User with id ${userId} is not found`,
        level: 'error',
        context: 'AuthService.refresh',
      });
      throw new NotFoundException('User is not found');
    }

    const tokens = await this.tokensService.generateTokens(user);
    return { accessToken: tokens.accessToken };
  }
}
