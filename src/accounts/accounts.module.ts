import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
// import { TrinsicConfig } from 'src/trinsic/trinsic.config';
import { AcocuntsController } from './accounts.controller';
import { AccountsService } from './accounts.service';

@Module({
  imports: [ConfigModule],
  controllers: [AcocuntsController],
  providers: [AccountsService], //TrinsicConfig
})
export class AccountsModule {}
