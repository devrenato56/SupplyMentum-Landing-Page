import {
  Controller,
  Post,
  Body,
  Get,
  UseGuards,
  Request,
  Res,
} from '@nestjs/common';
import { AuthService } from '../auth/auth.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import express from 'express';

@Controller('admin')
export class AdminController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(
    @Body() body: { username: string; password: string },
    @Res({ passthrough: true }) response: express.Response,
  ) {
    const result = await this.authService.login(body.username, body.password);
    response.cookie('admin_token', result.access_token, {
      httpOnly: true,
      secure: false,
      sameSite: 'strict',
      maxAge: 2 * 60 * 60 * 1000,
    });

    return `Success`;
  }

  @UseGuards(JwtAuthGuard)
  @Get('dashboard')
  getDashboardData(@Request() req) {
    return {
      message: `Welcome`,
    };
  }
}
