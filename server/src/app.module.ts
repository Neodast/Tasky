import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { ConfigModule } from './modules/config/config.module';
import { DatabaseModule } from './modules/database/database.module';
import { LoggerModule } from './modules/logger/logger.module';
import { UsersModule } from './modules/user/users.module';
import { WorkspacesModule } from './modules/workspace/workspaces.module';
import { APP_FILTER, APP_GUARD } from '@nestjs/core';
import { JwtGuard } from './modules/auth/guards/jwt-auth.guard';
import { JwtStrategy } from './modules/auth/strategies/jwt.strategy';
import { RolesGuard } from './modules/auth/guards/roles.guard';
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
