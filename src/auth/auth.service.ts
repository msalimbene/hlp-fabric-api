import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Logger } from '@nestjs/common';
import * as bcryptjs from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  async validateUser(username: string, pass: string): Promise<any> {
    if (process.env.APP_SECRET === pass) {
      return { username, password: pass };
    }
    return null;
  }

  async login(user: any) {
    Logger.log('running login', 'login');
    const salt = await bcryptjs.genSalt(10);
    const password = await bcryptjs.hash(user.password, salt);
    const payload = {
      message: "It's a dangerous business, Frodo, going out your door.",
      username: user.username,
      password,
      dateCreated: new Date().toISOString(),
    };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
