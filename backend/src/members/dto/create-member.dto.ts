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
    description: 'Full member name',
    example: 'Johan Osores',
  })
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  @IsString()
  @IsNotEmpty()
  @MaxLength(200)
  readonly full_name!: string;

  @ApiProperty({
    description:
      'ID of the role held by the member within the organization',
    example: 3,
  })
  @IsInt()
  @Min(1)
  readonly role_id!: number;

  @ApiPropertyOptional({
    description:
      'ID of the area the member belongs to. Can be null.',
    example: 1,
    nullable: true,
  })
  @IsOptional()
  @IsInt()
  @Min(1)
  readonly area_id?: number | null;

  @ApiPropertyOptional({
    description: 'Short description or introduction for the member',
    example: 'Marketing and CRM Director at SupplyMentum.',
    nullable: true,
  })
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  readonly description?: string | null;

  @ApiPropertyOptional({
    description: 'Path to the member photo within Supabase Storage',
    example: 'members/johan-osores.webp',
    nullable: true,
  })
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  readonly image_path?: string | null;

  @ApiPropertyOptional({
    description: 'LinkedIn profile URL for the member',
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
      'Indicates whether the member should be shown publicly on the landing page',
    example: true,
    default: true,
  })
  @IsOptional()
  @IsBoolean()
  readonly is_active?: boolean;

  @ApiPropertyOptional({
    description: 'Display order of the member within their hierarchy',
    example: 1,
    default: 0,
  })
  @IsOptional()
  @IsInt()
  @Min(0)
  readonly sort_order?: number;
}
