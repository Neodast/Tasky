import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from 'src/features/user/users.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { CookieHelper } from './helpers/cookie.helper';
import { LocalStrategy } from './strategies/local.strategy';
import { TokenModule } from './token/token.module';
import { Token } from './token/token.entity';
import { JwtRefreshStrategy } from './strategies/jwt-refresh.strategy';
import { AuthMapper } from './mappers/auth.mapper';
import { JwtAccessStrategy } from './strategies/jwt-access.strategy';
//TODO i want to create auth service in 4001 port
@Module({
  imports: [
    TokenModule,
    TypeOrmModule.forFeature([Token]),
    UsersModule,
    JwtModule.register({}),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    LocalStrategy,
    JwtAccessStrategy,
    JwtRefreshStrategy,
    CookieHelper,
    AuthMapper,
  ],
  exports: [AuthService, JwtModule],
})
export class AuthModule {}
