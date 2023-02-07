import {
  Controller,
  Get,
  //   Post,
  //   Body,
  //   Patch,
  //   Param,
  //   Delete,
  LoggerService,
  Inject,
} from '@nestjs/common';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import {
  //   ApiBearerAuth,
  //   ApiBody,
  ApiOperation,
  ApiResponse,
  //   ApiTags,
} from '@nestjs/swagger';
import { Trinsic } from './trinsic.service';
import { NoJwt as NoJwt } from '../auth/decorators/nojwt.decorator';

@Controller('/trinsic')
export class TrinsicController {
  constructor(
    @Inject(WINSTON_MODULE_NEST_PROVIDER)
    private readonly logger: LoggerService,
    private readonly trinsicService: Trinsic,
  ) {}

  @NoJwt()
  @Get()
  //   @ApiBearerAuth()
  @ApiOperation({ summary: 'Get ECOSYSTEM id from trinsic.' })
  @ApiResponse({ status: 200, description: 'Returns trinsic ecosystem.' })
  getEcosystem() {
    this.logger.log('GET', TrinsicController.name);
    return this.trinsicService.getEcoSystemId();
  }
}
