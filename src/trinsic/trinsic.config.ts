import { Inject, Injectable, LoggerService } from '@nestjs/common';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { TrinsicService } from '@trinsic/trinsic';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class TrinsicConfig {
  constructor(
    @Inject(WINSTON_MODULE_NEST_PROVIDER)
    private readonly logger: LoggerService,
    private readonly configService: ConfigService,
  ) {}

  setupTrinsic(token?: string): TrinsicService {
    if (!token) token = this.configService.get<string>('TRINSIC_AUTHTOKEN');
    this.logger.log(token, 'trinsic.srv');
    const trinsic = new TrinsicService();
    trinsic.setAuthToken(token);
    return trinsic;
  }
}
