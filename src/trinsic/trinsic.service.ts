import { Injectable } from '@nestjs/common';
import { EcosystemInfoRequest } from '@trinsic/trinsic';
import { TrinsicConfig } from './trinsic.config';
@Injectable()
export class Trinsic {
  constructor(private readonly trinsicService: TrinsicConfig) {}

  async getEcoSystemId(): Promise<string> {
    const trinsic = this.trinsicService.setupTrinsic();

    const infoResponse = await trinsic
      .provider()
      .ecosystemInfo(EcosystemInfoRequest.fromPartial({}));

    const ecosystem = infoResponse.ecosystem;

    return ecosystem?.id;
  }
}
