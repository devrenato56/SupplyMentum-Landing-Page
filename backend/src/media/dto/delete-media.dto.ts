import { Transform } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class DeleteMediaDto {
  @ApiProperty({
    description: 'Ruta del archivo que se desea eliminar de Supabase Storage',
    example: 'members/550e8400-e29b-41d4-a716-446655440000.webp',
  })
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  @IsString()
  @IsNotEmpty()
  readonly image_path!: string;
}
