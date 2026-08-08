import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { MembersService } from './members.service';

@ApiTags('Miembros')
@Controller('members')
export class MembersController {
  constructor(private readonly membersService: MembersService) {}

  @ApiOperation({
    summary: 'Obtener los miembros visibles de la organización',
    description:
      'Retorna los miembros activos ordenados según la jerarquía de su rol y su orden de presentación.',
  })
  @Get()
  findAll() {
    return this.membersService.findPublicAll();
  }

  @ApiOperation({
    summary: 'Obtener un miembro visible por su identificador',
  })
  @ApiParam({
    name: 'memberId',
    description: 'Identificador del miembro',
    type: Number,
    example: 1,
  })
  @Get(':memberId')
  findOne(
    @Param('memberId', ParseIntPipe)
    memberId: number,
  ) {
    return this.membersService.findPublicOne(memberId);
  }
}
