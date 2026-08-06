import { IsNotEmpty, IsString } from 'class-validator';

export class FaqDto {
  @IsString()
  @IsNotEmpty()
  readonly pregunta: string;

  @IsString()
  @IsNotEmpty()
  readonly respuesta: string;
}
