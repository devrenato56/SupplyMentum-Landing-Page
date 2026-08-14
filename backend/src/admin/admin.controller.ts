import {
  Controller,
  Post,
  Body,
  Get,
  UseGuards,
  Request,
  Res,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';
import { AuthService } from '../auth/auth.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import express from 'express';
import { AdminService } from './admin.service';

@Controller('/api/admin')
export class AdminController {
  constructor(
    private authService: AuthService,
    private adminService: AdminService,
  ) {}

  @Post('login')
  async login(
    @Body() body: { username: string; password: string },
    @Res({ passthrough: true }) response: express.Response,
  ) {
    const result = await this.authService.login(body.username, body.password);
    response.cookie('admin_token', result.access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 2 * 60 * 60 * 1000,
    });

    return {
      message: 'success',
    };
  }

  @Post('logout')
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard)
  logout(@Res({ passthrough: true }) response: express.Response) {
    response.clearCookie('admin_token', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
    });

    return {
      message: 'success',
    };
  }

  @UseGuards(JwtAuthGuard)
  @Get('dashboard')
  getDashboardData(@Request() req) {
    return {
      message: `Welcome`,
    };
  }

  @UseGuards(JwtAuthGuard)
  @Get('applicants')
  getApplicants(@Request() req) {
    return this.adminService.getApplicants();
  }
}
