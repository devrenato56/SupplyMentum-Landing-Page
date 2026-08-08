import { Transform } from 'class-transformer';
import {
  IsBoolean,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
  MaxLength,
  Min,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateMemberDto {
  @ApiProperty({
    description: 'Nombre completo del miembro',
    example: 'Johan Osores',
  })
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  @IsString()
  @IsNotEmpty()
  @MaxLength(200)
  readonly full_name!: string;

  @ApiProperty({
    description:
      'Identificador del rol que ocupa el miembro dentro de la organización',
    example: 3,
  })
  @IsInt()
  @Min(1)
  readonly role_id!: number;

  @ApiPropertyOptional({
    description:
      'Identificador del área a la que pertenece el miembro. Puede ser nulo.',
    example: 1,
    nullable: true,
  })
  @IsOptional()
  @IsInt()
  @Min(1)
  readonly area_id?: number | null;

  @ApiPropertyOptional({
    description: 'Descripción o presentación breve del miembro',
    example: 'Director de Marketing y CRM de SupplyMentum.',
    nullable: true,
  })
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  readonly description?: string | null;

  @ApiPropertyOptional({
    description: 'Ruta de la fotografía del miembro dentro de Supabase Storage',
    example: 'members/johan-osores.webp',
    nullable: true,
  })
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  readonly image_path?: string | null;

  @ApiPropertyOptional({
    description: 'Enlace al perfil de LinkedIn del miembro',
    example: 'https://www.linkedin.com/in/usuario',
    nullable: true,
  })
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  @IsOptional()
  @IsUrl({
    protocols: ['http', 'https'],
    require_protocol: true,
  })
  readonly linkedin_url?: string | null;

  @ApiPropertyOptional({
    description:
      'Indica si el miembro debe mostrarse públicamente en la landing',
    example: true,
    default: true,
  })
  @IsOptional()
  @IsBoolean()
  readonly is_active?: boolean;

  @ApiPropertyOptional({
    description: 'Orden de presentación del miembro dentro de su jerarquía',
    example: 1,
    default: 0,
  })
  @IsOptional()
  @IsInt()
  @Min(0)
  readonly sort_order?: number;
}
