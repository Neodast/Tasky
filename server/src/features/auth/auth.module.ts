import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from 'src/features/users/users.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { CookieHelper } from './helpers/cookie.helper';
import { LocalStrategy } from './strategies/local.strategy';
import { TokenModule } from './tokens/token.module';
import { TokenEntity } from './tokens/token.entity';
import { JwtRefreshStrategy } from './strategies/jwt-refresh.strategy';
import { AuthMapper } from './mappers/auth.mapper';
import { JwtAccessStrategy } from './strategies/jwt-access.strategy';
import { FirebaseModule } from 'src/firebase/firebase.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([TokenEntity]),
    JwtModule.register({}),
    TokenModule,
    UsersModule,
    FirebaseModule,
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
