import { IsNotEmptyObject, IsOptional, IsString } from 'class-validator';

export class UpsertCmsSectionDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsNotEmptyObject()
  payload: Record<string, unknown>;
}