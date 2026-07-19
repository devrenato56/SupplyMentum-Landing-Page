import { Controller, Post, Body, Get, UseGuards, Request } from '@nestjs/common';
import { AuthService } from '../auth/auth.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Admin')
@Controller('admin')
export class AdminController {
  constructor(private authService: AuthService) {}

  @ApiOperation({ summary: 'Login for admin users' })
  @ApiBody({
    schema: {
      type: 'object',
      required: ['username', 'password'],
      properties: {
        username: { type: 'string' },
        password: { type: 'string' },
      },
    },
  })
  @Post('login')
  async login(@Body() body: { username: string; password: string }) {
    return this.authService.login(body.username, body.password);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Protected admin dashboard sample route' })
  @UseGuards(JwtAuthGuard)
  @Get('dashboard')
  getDashboardData(@Request() req) {
    return {
      message: `Welcome`,
    };
  }
}
