import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApplicationService } from './application.service';
import { ApplicationDto } from './dto/application.dto';

@Controller('api/application')
export class ApplicationController {
  constructor(private applicationService: ApplicationService) {}

  @Get('areas')
  getAreas() {
    return this.applicationService.listAreas();
  }

  @Post()
  sendApplication(@Body() applicationDto: ApplicationDto) {
    return this.applicationService.sendApplication(applicationDto);
  }
}
