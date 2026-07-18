import { Controller, Post, Body, Get, UseGuards, Request } from '@nestjs/common';
import { AuthService } from '../auth/auth.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('admin')
export class AdminController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Body() body: { username: string; password: string }) {
    return this.authService.login(body.username, body.password);
  }

  @UseGuards(JwtAuthGuard)
  @Get('dashboard')
  getDashboardData(@Request() req) {
    return {
      message: `Welcome`,
    };
  }
}
