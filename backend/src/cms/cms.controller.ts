import { Body, Controller, Get, Param, Put, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CmsService } from './cms.service';
import { UpsertCmsSectionDto } from './dto/upsert-cms-section.dto';

@Controller('api/cms')
export class CmsController {
  constructor(private readonly cmsService: CmsService) {}

  @Get()
  listSections() {
    return this.cmsService.listSections();
  }

  @Get(':sectionKey')
  getSection(@Param('sectionKey') sectionKey: string) {
    return this.cmsService.getSection(sectionKey);
  }
}

@UseGuards(JwtAuthGuard)
@Controller('admin/cms')
export class AdminCmsController {
  constructor(private readonly cmsService: CmsService) {}

  @Get()
  listSections() {
    return this.cmsService.listSections();
  }

  @Get(':sectionKey')
  getSection(@Param('sectionKey') sectionKey: string) {
    return this.cmsService.getSection(sectionKey);
  }

  @Put(':sectionKey')
  upsertSection(
    @Param('sectionKey') sectionKey: string,
    @Body() dto: UpsertCmsSectionDto,
  ) {
    return this.cmsService.upsertSection(sectionKey, dto);
  }
}