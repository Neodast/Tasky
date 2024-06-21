import { Injectable } from '@nestjs/common';
import * as winston from 'winston';

@Injectable()
export class LoggerHelper {
  public static formatPrintableInfo(
    info: winston.Logform.TransformableInfo,
  ): string {
    const metaString = Object.keys(info.meta).length
      ? JSON.stringify(info.meta)
      : '';
    const contextMessage = info.context
      ? `\x1b[33m[${info.context}]\x1b[0m`
      : '';
    const pidMessage = `\x1b[32m[Nest] ${process.pid}\x1b[32m`;
    const timestampMessage = `\x1b[37m ${info.timestamp}\x1b[37m`;
    const levelMessage = `\x1b[32m${info.level.toUpperCase()}\x1b[32m`;
    const infoMessage = `${info.message}`;

    return `${pidMessage}  -${timestampMessage} \t${levelMessage} ${contextMessage} ${infoMessage} ${metaString}`;
  }
}
