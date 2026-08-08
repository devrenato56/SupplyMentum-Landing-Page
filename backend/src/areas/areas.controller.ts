import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { AreasService } from './areas.service';

@ApiTags('Areas')
@Controller('areas')
export class AreasController {
  constructor(private readonly areasService: AreasService) {}

  @ApiOperation({
    summary: 'Obtener áreas activas',
    description: 'Retorna las áreas actualmente visibles en la landing page.',
  })
  @Get()
  findAll() {
    return this.areasService.findPublicAll();
  }

  @ApiOperation({
    summary: 'Obtener un área activa por ID',
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
    return this.areasService.findPublicOne(areaId);
  }
}
