import { IsEmail, IsNotEmpty, IsNumber, IsString } from 'class-validator';
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
  @IsEmail()
  readonly email: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly phone: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly career: string;

  @IsNumber()
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly university: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly university_semester: number;

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
