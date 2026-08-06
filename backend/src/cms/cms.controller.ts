import { Body, Controller, Get, Param, Put, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CmsService } from './cms.service';
import { UpsertCmsSectionDto } from './dto/upsert-cms-section.dto';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';

@ApiTags('CMS')
@Controller('api/cms')
export class CmsController {
  constructor(private readonly cmsService: CmsService) {}

  @ApiOperation({ summary: 'List public CMS sections' })
  @Get()
  listSections() {
    return this.cmsService.listSections();
  }

  @ApiOperation({ summary: 'Get a public CMS section by key' })
  @ApiParam({ name: 'sectionKey', example: 'hero' })
  @Get(':sectionKey')
  getSection(@Param('sectionKey') sectionKey: string) {
    return this.cmsService.getSection(sectionKey);
  }
}

@ApiTags('Admin CMS')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('admin/cms')
export class AdminCmsController {
  constructor(private readonly cmsService: CmsService) {}

  @ApiOperation({ summary: 'List CMS sections for admin users' })
  @Get()
  listSections() {
    return this.cmsService.listSections();
  }

  @ApiOperation({ summary: 'Get a CMS section for editing' })
  @ApiParam({ name: 'sectionKey', example: 'hero' })
  @Get(':sectionKey')
  getSection(@Param('sectionKey') sectionKey: string) {
    return this.cmsService.getSection(sectionKey);
  }

  @ApiOperation({ summary: 'Create or update a CMS section' })
  @ApiParam({ name: 'sectionKey', example: 'hero' })
  @ApiBody({ type: UpsertCmsSectionDto })
  @Put(':sectionKey')
  upsertSection(
    @Param('sectionKey') sectionKey: string,
    @Body() dto: UpsertCmsSectionDto,
  ) {
    return this.cmsService.upsertSection(sectionKey, dto);
  }
}