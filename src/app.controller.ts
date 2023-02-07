import { Controller, Request, UseGuards } from '@nestjs/common';
import { Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';
import { LocalAuthGuard } from './auth/guards/local-auth.guard';
import { NoJwt as NoJwt } from './auth/decorators/nojwt.decorator';
import { ApiExcludeController } from '@nestjs/swagger';
// import { Logger } from '@nestjs/common';

@ApiExcludeController()
@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private authService: AuthService,
  ) {}

  @NoJwt()
  @Get('health')
  healthCheck(): string {
    return this.appService.healthCheck();
  }

  @NoJwt()
  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }
}
