import { Module } from '@nestjs/common';
import { AuthModule } from './features/auth/auth.module';
import { ConfigModule } from './config/config.module';
import { DatabaseModule } from './database/database.module';
import { LoggerModule } from './logger/logger.module';
import { UsersModule } from './features/users/users.module';
import { APP_FILTER } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { AllExceptionsFilter } from './common/filters/exception.filter';
import { WorkspacesModule } from './features/workspaces/workspaces.module';
@Module({
  imports: [
    UsersModule,
    ConfigModule,
    LoggerModule,
    DatabaseModule,
    AuthModule,
    WorkspacesModule,
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
    JwtService,
  ],
})
export class AppModule {}
