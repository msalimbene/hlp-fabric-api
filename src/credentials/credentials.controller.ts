import { Controller, Get } from '@nestjs/common';
import { CredentialService } from '@trinsic/trinsic';

@Controller()
export class CredentialsController {
  constructor(private readonly credService: CredentialService) {}

  @Get()
  getHello(): string {
    return 'dummy';
  }
}
