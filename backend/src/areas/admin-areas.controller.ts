import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import {
  ApiCookieAuth,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { AreasService } from './areas.service';
import { CreateAreaDto } from './dto/create-area.dto';
import { UpdateAreaDto } from './dto/update-area.dto';

@ApiTags('Admin - Areas')
@ApiCookieAuth('admin_token')
@UseGuards(JwtAuthGuard)
@Controller('admin/areas')
export class AdminAreasController {
  constructor(private readonly areasService: AreasService) {}

  @ApiOperation({
    summary: 'Obtener todas las áreas',
    description: 'Retorna las áreas activas e inactivas para administración en el CMS.',
  })
  @Get()
  findAll() {
    return this.areasService.findAdminAll();
  }

  @ApiOperation({
    summary: 'Obtener área por ID',
  })
  @ApiParam({
    name: 'areaId',
    type: Number,
    example: 1,
  })
  @Get(':areaId')
  findOne(
    @Param('areaId', ParseIntPipe)
    areaId: number,
  ) {
    return this.areasService.findAdminOne(areaId);
  }

  @ApiOperation({
    summary: 'Crear un área',
  })
  @Post()
  create(
    @Body()
    createAreaDto: CreateAreaDto,
  ) {
    return this.areasService.create(createAreaDto);
  }

  @ApiOperation({
    summary: 'Actualizar un área',
  })
  @ApiParam({
    name: 'areaId',
    type: Number,
    example: 1,
  })
  @Patch(':areaId')
  update(
    @Param('areaId', ParseIntPipe)
    areaId: number,
    @Body()
    updateAreaDto: UpdateAreaDto,
  ) {
    return this.areasService.update(areaId, updateAreaDto);
  }

  @ApiOperation({
    summary: 'Desactivar un área',
    description: 'Realiza una "eliminación" del área al dejarla como inactiva (is_active = false).',
  })
  @ApiParam({
    name: 'areaId',
    type: Number,
    example: 1,
  })
  @Delete(':areaId')
  remove(
    @Param('areaId', ParseIntPipe)
    areaId: number,
  ) {
    return this.areasService.remove(areaId);
  }
}
