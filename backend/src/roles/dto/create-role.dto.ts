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

export class CreateRoleDto {
  @ApiProperty({
    description: 'Nombre del rol dentro de la organización',
    example: 'Director',
  })
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  readonly name!: string;

  @ApiPropertyOptional({
    description: 'Orden jerárquico utilizado para mostrar los roles',
    example: 3,
    default: 0,
  })
  @IsOptional()
  @IsInt()
  @Min(0)
  readonly sort_order?: number;

  @ApiPropertyOptional({
    description: 'Indica si el rol puede utilizarse dentro de la organización',
    example: true,
    default: true,
  })
  @IsOptional()
  @IsBoolean()
  readonly is_active?: boolean;
}
