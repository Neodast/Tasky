import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { AllExceptionsFilter } from './common/filters/exception.filter';
import { ConfigModule } from './config/config.module';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './features/auth/auth.module';
import { UsersModule } from './features/users/users.module';
import { WorkspacesModule } from './features/workspaces/workspaces.module';
import { FirebaseModule } from './firebase/firebase.module';
import { LoggerModule } from './logger/logger.module';
@Module({
  imports: [
    FirebaseModule,
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
