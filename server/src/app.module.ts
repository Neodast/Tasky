import { Module } from '@nestjs/common';
import { AuthModule } from './features/auth/auth.module';
import { ConfigModule } from './config/config.module';
import { DatabaseModule } from './database/database.module';
import { LoggerModule } from './logger/logger.module';
import { UsersModule } from './features/user/users.module';
import { APP_FILTER } from '@nestjs/core';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { JwtService } from '@nestjs/jwt';
@Module({
  imports: [
    UsersModule,
    ConfigModule,
    LoggerModule,
    DatabaseModule,
    AuthModule,
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
    JwtService,
  ],
})
export class AppModule {}
