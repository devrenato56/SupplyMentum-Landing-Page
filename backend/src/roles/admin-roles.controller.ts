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
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { RolesService } from './roles.service';

@ApiTags('Admin - Roles')
@ApiCookieAuth('admin_token')
@UseGuards(JwtAuthGuard)
@Controller('admin/roles')
export class AdminRolesController {
  constructor(private readonly rolesService: RolesService) {}

  @ApiOperation({
    summary: 'Obtener todos los roles de la organización',
    description: 'Retorna los roles activos e inactivos disponibles en el CMS.',
  })
  @Get()
  findAll() {
    return this.rolesService.findAll();
  }

  @ApiOperation({
    summary: 'Obtener un rol por su identificador',
  })
  @ApiParam({
    name: 'roleId',
    description: 'Identificador del rol',
    type: Number,
    example: 1,
  })
  @Get(':roleId')
  findOne(
    @Param('roleId', ParseIntPipe)
    roleId: number,
  ) {
    return this.rolesService.findOne(roleId);
  }

  @ApiOperation({
    summary: 'Crear un nuevo rol para la organización',
  })
  @Post()
  create(
    @Body()
    createRoleDto: CreateRoleDto,
  ) {
    return this.rolesService.create(createRoleDto);
  }

  @ApiOperation({
    summary: 'Actualizar los datos de un rol',
  })
  @ApiParam({
    name: 'roleId',
    description: 'Identificador del rol',
    type: Number,
    example: 1,
  })
  @Patch(':roleId')
  update(
    @Param('roleId', ParseIntPipe)
    roleId: number,
    @Body()
    updateRoleDto: UpdateRoleDto,
  ) {
    return this.rolesService.update(roleId, updateRoleDto);
  }

  @ApiOperation({
    summary: 'Desactivar un rol de la organización',
    description:
      'Realiza una eliminación lógica estableciendo is_active en false.',
  })
  @ApiParam({
    name: 'roleId',
    description: 'Identificador del rol',
    type: Number,
    example: 1,
  })
  @Delete(':roleId')
  remove(
    @Param('roleId', ParseIntPipe)
    roleId: number,
  ) {
    return this.rolesService.remove(roleId);
  }
}
