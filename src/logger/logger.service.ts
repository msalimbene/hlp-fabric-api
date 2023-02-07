import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { LoggingWinston } from '@google-cloud/logging-winston';
import * as winston from 'winston';
import { join } from 'path';

@Injectable()
export class WinstonConfigService {
  constructor(private readonly configService: ConfigService) {}
  createWinstonModuleOptions() {
    const { format, transports } = winston;
    const { splat, simple, printf, timestamp } = format;

    const myFormat = printf(({ level, message, timestamp }) => {
      return `${timestamp} ${level}: ${message}`;
    });

    const level = process.env.NODE_ENV !== 'production' ? 'info' : 'error';

    const all = new transports.File({
      filename: 'combined.log',
      level,
    });

    const error = new transports.File({
      filename: 'errors.log',
      level: 'error',
    });

    const console = new transports.Console({
      format: format.combine(),
    });

    const keyFilename = join(
      __dirname,
      `${this.configService.get<string>('keyFilename')}`,
    );
    const prefix = this.configService.get<string>('gLog-prefix');
    const projectId = this.configService.get<string>('glog-projectId');
    const logName = this.configService.get<string>('glog-logname');

    const google = new LoggingWinston({
      level,
      prefix,
      projectId,
      logName,
      keyFilename,
    });

    return {
      level,
      format: format.combine(
        splat(),
        simple(),
        timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        myFormat,
      ),
      transports: [all, error, console, google],
    };
  }
}
