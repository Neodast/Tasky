import { Injectable } from '@nestjs/common';
import * as winston from 'winston';

@Injectable()
export class LoggerHelper {
  public format(): winston.Logform.Format {
    const outputFormat = winston.format.combine(
      winston.format.timestamp({ format: 'DD.MM.YYYY, HH:mm:ss' }),
      winston.format.printf(
        ({ level, message, timestamp, context, ...meta }) => {
          const metaString = Object.keys(meta).length
            ? JSON.stringify(meta)
            : '';
          const contextMessage = context ? `\x1b[33m[${context}]\x1b[0m` : '';
          const pidMessage = `\x1b[32m[Nest] ${process.pid}\x1b[32m`;
          const timestampMessage = `\x1b[37m ${timestamp}\x1b[37m`;
          const levelMessage = `\x1b[32m${level.toUpperCase()}\x1b[32m`;
          const infoMessage = `\x1b[32m${message}\x1b[32m`;

          return `${pidMessage}  -${timestampMessage} \t${levelMessage} ${contextMessage} ${infoMessage} ${metaString}`;
        },
      ),
      winston.format.colorize({
        all: false,
      }),
    );
    return outputFormat;
  }
}
