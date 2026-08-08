import { Transform } from 'class-transformer';
import {
  IsBoolean,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  Min,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateAreaDto {
  @ApiProperty({
    description: 'Nombre completo del área',
    example: 'Capital Humano y Excelencia',
  })
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  @IsString()
  @IsNotEmpty()
  @MaxLength(150)
  readonly name!: string;

  @ApiPropertyOptional({
    description: 'Nombre corto o abreviatura del área',
    example: 'CHE',
  })
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  readonly short_name?: string;

  @ApiPropertyOptional({
    description: 'Descripción del área que puede mostrarse en la landing',
    example:
      'Área encargada del desarrollo del talento y la cultura organizacional.',
  })
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  readonly description?: string;

  @ApiPropertyOptional({
    description: 'Ruta de la imagen asociada al área en Supabase Storage',
    example: 'areas/capital-humano.webp',
  })
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  readonly image_path?: string;

  @ApiPropertyOptional({
    description: 'Determina si el área se encuentra visible en la landing',
    example: true,
    default: true,
  })
  @IsOptional()
  @IsBoolean()
  readonly is_active?: boolean;

  @ApiPropertyOptional({
    description: 'Orden en el que el área será mostrada en la landing',
    example: 1,
    default: 0,
  })
  @IsOptional()
  @IsInt()
  @Min(0)
  readonly sort_order?: number;
}
