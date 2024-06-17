import { Module } from '@nestjs/common';
import { WinstonModule } from 'nest-winston';
import * as winston from 'winston';
import { LoggerHelper } from './logger.helper';

@Module({
  imports: [
    WinstonModule.forRootAsync({
      imports: [LoggerModule],
      useFactory: (loggerHelper: LoggerHelper) => ({
        transports: [
          new winston.transports.Console({
            format: loggerHelper.format(),
          }),
        ],
      }),
      inject: [LoggerHelper],
    }),
  ],
  providers: [LoggerHelper],
  exports: [LoggerHelper],
})
export class LoggerModule {}
