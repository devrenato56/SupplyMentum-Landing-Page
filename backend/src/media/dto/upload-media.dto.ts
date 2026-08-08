import { ApiProperty } from '@nestjs/swagger';
import { IsIn, IsNotEmpty, IsString } from 'class-validator';

export const MEDIA_RESOURCES = [
  'areas',
  'events',
  'members',
  'projects',
] as const;

export type MediaResource = (typeof MEDIA_RESOURCES)[number];

export class UploadMediaDto {
  @ApiProperty({
    description: 'Tipo de recurso al que pertenecerá la imagen',
    example: 'members',
    enum: MEDIA_RESOURCES,
  })
  @IsString()
  @IsNotEmpty()
  @IsIn(MEDIA_RESOURCES)
  readonly resource!: MediaResource;
}
