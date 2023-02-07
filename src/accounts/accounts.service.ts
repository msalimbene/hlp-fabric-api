import { Injectable } from '@nestjs/common';
import { AccountInfoResponse } from '@trinsic/trinsic';
import { TrinsicConfig } from '../trinsic/trinsic.config';
import { Logger } from '@nestjs/common';

@Injectable()
export class AccountsService {
  constructor(private readonly trinsicService: TrinsicConfig) {}

  async createAccount(): Promise<AccountInfoResponse> {
    let trinsic = this.trinsicService.setupTrinsic();

    const auth_token = await trinsic.account().loginAnonymous();

    Logger.log(`auth_token ${auth_token}`, 'account.srv');

    trinsic = this.trinsicService.setupTrinsic(auth_token);

    return await trinsic.account().info();
  }
}
