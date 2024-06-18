import { Global, Module } from '@nestjs/common';
import { WinstonModule } from 'nest-winston';
import * as winston from 'winston';
import { LoggerHelper } from './logger.helper';

@Global()
@Module({
  imports: [
    WinstonModule.forRootAsync({
      useFactory: () => ({
        transports: [
          new winston.transports.Console({
            format: winston.format.combine(
              winston.format.timestamp({ format: 'DD.MM.YYYY, HH:mm:ss' }),
              winston.format.printf(
                ({ level, message, timestamp, context, ...meta }) => {
                  return LoggerHelper.formatPrintableInfo({
                    level: level,
                    message: message,
                    timestamp: timestamp,
                    context: context,
                    meta: meta,
                  });
                },
              ),
              winston.format.colorize({
                all: false,
              }),
            ),
          }),
        ],
      }),
    }),
  ],
  providers: [LoggerHelper],
})
export class LoggerModule {}
