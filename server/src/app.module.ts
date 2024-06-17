import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from './config/config.module';
import { DatabaseModule } from './database/database.module';
import { LoggerModule } from './logger/logger.module';
import { WorkspaceModule } from './workspace/workspace.module';
@Module({
  imports: [
    ConfigModule,
    WorkspaceModule,
    LoggerModule,
    DatabaseModule,
    AuthModule,
    AuthModule,
  ],
})
export class AppModule {}
