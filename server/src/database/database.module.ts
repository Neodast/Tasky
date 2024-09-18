import { Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';

@Global()
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService, logger: Logger) => {
        const dbConfig: TypeOrmModuleOptions = {
          type: 'postgres',
          host: configService.get<string>('database.host'),
          port: configService.get<number>('database.port'),
          username: configService.get<string>('database.user'),
          password: configService.get<string>('database.password'),
          database: configService.get<string>('database.name'),
          entities: [],
          synchronize:
            configService.get<string>('node.env') !== 'production'
              ? true
              : false,
        };

        logger.log({
          context: 'DatabaseModule',
          level: 'info',
          message: `Connecting to database ${dbConfig.database} at ${dbConfig.host}:${dbConfig.port}`,
        });

        return dbConfig;
      },
      inject: [ConfigService, WINSTON_MODULE_NEST_PROVIDER],
    }),
  ],
})
export class DatabaseModule {}
