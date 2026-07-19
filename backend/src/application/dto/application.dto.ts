import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ApplicationDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly first_name: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly last_name: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly email: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly phone: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly career: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly university: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly university_semester: string;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  readonly first_choice_area_id: number;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  readonly second_choice_area_id: number;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly application_reason: string;
}
