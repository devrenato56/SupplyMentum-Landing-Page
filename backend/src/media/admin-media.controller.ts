import {
  Body,
  Controller,
  Delete,
  MaxFileSizeValidator,
  ParseFilePipe,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiBody,
  ApiConsumes,
  ApiCookieAuth,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileTypeValidator } from '@nestjs/common';

import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { DeleteMediaDto } from './dto/delete-media.dto';
import { UploadMediaDto } from './dto/upload-media.dto';
import { MediaService } from './media.service';

@ApiTags('Admin - Multimedia')
@ApiCookieAuth('admin_token')
@UseGuards(JwtAuthGuard)
@Controller('admin/media')
export class AdminMediaController {
  constructor(private readonly mediaService: MediaService) {}

  @ApiOperation({
    summary: 'Subir una imagen al almacenamiento del CMS',
    description:
      'Sube una imagen JPEG, PNG o WebP a Supabase Storage y devuelve su ruta y URL pública.',
  })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      required: ['file', 'resource'],
      properties: {
        file: {
          type: 'string',
          format: 'binary',
          description: 'Imagen que se desea subir',
        },
        resource: {
          type: 'string',
          enum: ['areas', 'events', 'members', 'projects'],
          description: 'Tipo de recurso al que pertenece la imagen',
          example: 'members',
        },
      },
    },
  })
  @UseInterceptors(FileInterceptor('file'))
  @Post()
  upload(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({
            maxSize: 5 * 1024 * 1024,
          }),

          new FileTypeValidator({
            fileType: /^image\/(jpeg|png|webp)$/,
          }),
        ],
        fileIsRequired: true,
      }),
    )
    file: Express.Multer.File,

    @Body()
    uploadMediaDto: UploadMediaDto,
  ) {
    return this.mediaService.upload(file, uploadMediaDto.resource);
  }

  @ApiOperation({
    summary: 'Eliminar una imagen del almacenamiento del CMS',
    description:
      'Elimina una imagen almacenada dentro del bucket de contenido multimedia.',
  })
  @Delete()
  remove(
    @Body()
    deleteMediaDto: DeleteMediaDto,
  ) {
    return this.mediaService.remove(deleteMediaDto.image_path);
  }
}
