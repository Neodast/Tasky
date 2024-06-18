import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from './config/config.module';
import { DatabaseModule } from './database/database.module';
import { LoggerModule } from './logger/logger.module';
import { UserModule } from './user/user.module';
import { WorkspaceModule } from './workspace/workspace.module';
@Module({
  imports: [
    UserModule,
    ConfigModule,
    WorkspaceModule,
    LoggerModule,
    DatabaseModule,
    AuthModule,
  ],
})
export class AppModule {}
