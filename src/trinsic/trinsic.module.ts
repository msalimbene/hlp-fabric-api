import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TrinsicConfig } from './trinsic.config';
import { TrinsicController } from './trinsic.controller';
import { Trinsic } from './trinsic.service';

@Module({
  imports: [ConfigModule],
  controllers: [TrinsicController],
  providers: [Trinsic, TrinsicConfig],
})
export class TrinsicModule {}
