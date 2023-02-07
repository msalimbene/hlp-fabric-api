import { Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { NoJwt } from '../auth/decorators/nojwt.decorator';
import { AccountsService } from './accounts.service';

@Controller('/accounts')
export class AcocuntsController {
  constructor(private readonly credService: AccountsService) {}

  @NoJwt()
  @Post()
  @ApiOperation({ summary: 'create anon account.' })
  @ApiResponse({ status: 200, description: 'Returns created account info.' })
  createAccount(): string {
    return 'hey';
  }
}
