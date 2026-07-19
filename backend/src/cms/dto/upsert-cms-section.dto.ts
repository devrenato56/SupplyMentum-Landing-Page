import { IsNotEmptyObject, IsOptional, IsString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class UpsertCmsSectionDto {
  @ApiPropertyOptional({ example: 'Hero principal' })
  @IsOptional()
  @IsString()
  title?: string;

  @ApiProperty({
    type: 'object',
    additionalProperties: true,
    example: {
      headline: 'Título principal',
      subheadline: 'Texto descriptivo',
      ctaText: 'Conoce más',
      ctaUrl: '/contacto',
      imageUrl: null,
    },
  })
  @IsNotEmptyObject()
  payload: Record<string, unknown>;
}