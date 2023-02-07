import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { Logger } from '@nestjs/common';
import { WinstonModule } from 'nest-winston';
import { WinstonConfigService } from './logger/logger.service';
import gcloudConfig from './config/gcloudConfig';
// import { TrinsicModule } from './trinsic/trinsic.module';
import { AccountsModule } from './accounts/accounts.module';

Logger.log('loading application', 'app.module');

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [gcloudConfig] }),
    WinstonModule.forRootAsync({ useClass: WinstonConfigService }),
    // TrinsicModule,
    AccountsModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
