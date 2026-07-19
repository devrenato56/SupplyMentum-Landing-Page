import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApplicationService } from './application.service';
import { ApplicationDto } from './dto/application.dto';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Applications')
@Controller('api/application')
export class ApplicationController {
  constructor(private applicationService: ApplicationService) {}

  @ApiOperation({ summary: 'List available areas for applicants' })
  @Get('areas')
  getAreas() {
    return this.applicationService.listAreas();
  }

  @ApiOperation({ summary: 'Submit an application' })
  @ApiBody({ type: ApplicationDto })
  @Post()
  sendApplication(@Body() applicationDto: ApplicationDto) {
    return this.applicationService.sendApplication(applicationDto);
  }
}
