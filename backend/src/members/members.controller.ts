import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { MembersService } from './members.service';

@ApiTags('Miembros')
@Controller('members')
export class MembersController {
  constructor(private readonly membersService: MembersService) {}

  @ApiOperation({
    summary: 'Get visible organization members',
    description:
      'Returns active members ordered by role hierarchy and display order.',
  })
  @ApiResponse({
    status: 200,
    description: 'List of visible members returned successfully.',
    schema: {
      example: [
        {
          member_id: 1,
          full_name: 'Johan Osores',
          role_id: 3,
          role: {
            role_id: 3,
            name: 'Director',
          },
          area_id: 1,
          area: {
            area_id: 1,
            name: 'Capital Humano y Excelencia',
          },
          description: 'Marketing and CRM Director at SupplyMentum.',
          image_path: 'members/johan-osores.webp',
          linkedin_url: 'https://www.linkedin.com/in/usuario',
          is_active: true,
          sort_order: 1,
        },
      ],
    },
  })
  @Get()
  findAll() {
    return this.membersService.findPublicAll();
  }

  @ApiOperation({
    summary: 'Get a visible member by ID',
  })
  @ApiParam({
    name: 'memberId',
    description: 'Member ID',
    type: Number,
    example: 1,
  })
  @ApiResponse({
    status: 200,
    description: 'Member returned successfully.',
    schema: {
      example: {
        member_id: 1,
        full_name: 'Johan Osores',
        role_id: 3,
        role: {
          role_id: 3,
          name: 'Director',
        },
        area_id: 1,
        area: {
          area_id: 1,
          name: 'Capital Humano y Excelencia',
        },
        description: 'Marketing and CRM Director at SupplyMentum.',
        image_path: 'members/johan-osores.webp',
        linkedin_url: 'https://www.linkedin.com/in/usuario',
        is_active: true,
        sort_order: 1,
      },
    },
  })
  @Get(':memberId')
  findOne(
    @Param('memberId', ParseIntPipe)
    memberId: number,
  ) {
    return this.membersService.findPublicOne(memberId);
  }
}
