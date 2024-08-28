import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Token } from './token.entity';
import { Repository, UpdateResult } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { AccessToken } from 'src/features/auth/types/access-token.type';
import { RefreshToken } from '../types/refresh-token.type';
import { UserPayloadDto } from '../dtos/user-payload.dto';
import { ConfigService } from '@nestjs/config';
import { UpdateTokenDto } from './dtos/update-token.dto';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';

@Injectable()
export class TokensService {
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
    @InjectRepository(Token) private repository: Repository<Token>,
    @Inject(WINSTON_MODULE_NEST_PROVIDER) private logger: Logger,
  ) {}

  public async generateTokens(
    payload: UserPayloadDto,
  ): Promise<AccessToken & RefreshToken> {
    const tokens = {
      accessToken: this.jwtService.sign(
        { sub: payload },
        {
          secret: this.configService.get<string>('jwt.access.secret'),
          expiresIn: this.configService.get<string>('jwt.access.expires'),
        },
      ),
      refreshToken: this.jwtService.sign(
        { sub: payload },
        {
          secret: this.configService.get<string>('jwt.refresh.secret'),
          expiresIn: this.configService.get<string>('jwt.refresh.expires'),
        },
      ),
    };
    this.logger.log({
      message: `Tokens created for user ${payload.username}`,
      level: 'info',
      context: 'TokensService.generateTokens',
    });
    return tokens;
  }

  public async saveRefreshToken(
    refreshToken: string,
    userId: string,
  ): Promise<Token> {
    return this.repository.save(
      this.repository.create({
        refreshToken: refreshToken,
        user: { id: userId },
      }),
    );
  }

  public async updateRefreshToken(
    tokenData: UpdateTokenDto,
  ): Promise<UpdateResult> {
    return this.repository.update(
      { user: { id: tokenData.userId } },
      { refreshToken: tokenData.refreshToken },
    );
  }

  public async deleteRefreshToken(refreshToken: string): Promise<void> {
    const token = await this.getRefreshByRefreshToken(refreshToken);
    this.repository.remove(token);
  }

  public async getRefreshByUserId(id: string): Promise<Token | null> {
    return this.repository.findOne({ where: { user: { id: id } } });
  }

  public async getRefreshByRefreshToken(
    refreshToken: string,
  ): Promise<Token | null> {
    return this.repository.findOne({
      where: { refreshToken: refreshToken },
    });
  }
}
