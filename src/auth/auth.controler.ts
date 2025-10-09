import { Controller, Get, Request, Post, UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from './local-auth.guard';
import { AuthService } from './auth.service';
import { Public } from '../decorator/public.decorator';

@Controller()
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req) {
    // Later for cookie-based auth
    // const access_token = this.authService.login(req.user);
    // res.cookie('token', access_token, {
    //   httpOnly: true,
    //   maxAge: process.env.JWT_EXPIRATION_TIME,
    // });
    // return this.authService.login(req.user);
    const access_token = await this.authService.login(req.user);
    return { access_token: access_token };
  }

  @Public()
  @Post('auth/signup')
  async register(@Request() req) {
    return this.authService.signup(req.body);
  }

  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
