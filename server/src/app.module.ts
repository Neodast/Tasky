import { Module } from '@nestjs/common';
import { AuthModule } from './features/auth/auth.module';
import { ConfigModule } from './config/config.module';
import { DatabaseModule } from './database/database.module';
import { LoggerModule } from './logger/logger.module';
import { UsersModule } from './features/user/users.module';
import { WorkspacesModule } from './features/workspace/workspaces.module';
import { APP_FILTER, APP_GUARD } from '@nestjs/core';
import { JwtGuard } from './features/auth/guards/jwt-auth.guard';
import { JwtStrategy } from './features/auth/strategies/jwt.strategy';
import { RolesGuard } from './features/auth/guards/roles.guard';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { JwtService } from '@nestjs/jwt';
@Module({
  imports: [
    UsersModule,
    ConfigModule,
    WorkspacesModule,
    LoggerModule,
    DatabaseModule,
    AuthModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
    JwtStrategy,
    JwtService,
  ],
})
export class AppModule {}
