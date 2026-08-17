import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ApiBody, ApiCookieAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import type { Response } from 'express';
import { AuthService } from '../auth/auth.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { AdminService } from './admin.service';

@ApiTags('Admin')
@Controller('admin')
export class AdminController {
  constructor(
    private readonly authService: AuthService,
    private readonly adminService: AdminService,
  ) {}

  @ApiOperation({
    summary: 'Login for admin users',
  })
  @ApiBody({
    schema: {
      type: 'object',
      required: ['username', 'password'],
      properties: {
        username: {
          type: 'string',
          example: 'admin',
        },
        password: {
          type: 'string',
          format: 'password',
        },
      },
    },
  })
  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(
    @Body()
    body: {
      username: string;
      password: string;
    },
    @Res({ passthrough: true })
    response: Response,
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

  @ApiCookieAuth('admin_token')
  @ApiOperation({
    summary: 'Logout admin user',
  })
  @Post('logout')
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard)
  logout(
    @Res({ passthrough: true })
    response: Response,
  ) {
    response.clearCookie('admin_token', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
    });

    return {
      message: 'success',
    };
  }

  @ApiCookieAuth('admin_token')
  @ApiOperation({
    summary: 'Protected admin dashboard sample route',
  })
  @UseGuards(JwtAuthGuard)
  @Get('dashboard')
  getDashboardData() {
    return {
      message: 'Welcome',
    };
  }

  @ApiCookieAuth('admin_token')
  @ApiOperation({
    summary: 'Get applicants',
  })
  @UseGuards(JwtAuthGuard)
  @Get('applicants')
  getApplicants() {
    return this.adminService.getApplicants();
  }
}
