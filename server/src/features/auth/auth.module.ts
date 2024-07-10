import { Module } from '@nestjs/common';
import { UsersModule } from 'src/features/user/users.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtGuard } from './guards/jwt-auth.guard';
import { CookieHelper } from './helpers/cookie.helper';
import { Token } from './token.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
//TODO i want to create auth service in 4001 port
@Module({
  imports: [
    TypeOrmModule.forFeature([Token]),
    UsersModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('jwt.secret'),
        signOptions: {
          expiresIn: configService.get<string>('jwt.expires'),
        },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtGuard, CookieHelper],
  exports: [AuthService, JwtModule],
})
export class AuthModule {}
