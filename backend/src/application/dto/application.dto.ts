import { IsEmail, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class ApplicationDto {
  @IsString()
  @IsNotEmpty()
  readonly first_name: string;

  @IsString()
  @IsNotEmpty()
  readonly last_name: string;

  @IsString()
  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  @IsString()
  @IsNotEmpty()
  readonly phone: string;

  @IsString()
  @IsNotEmpty()
  readonly career: string;

  @IsNumber()
  @IsNotEmpty()
  readonly university_semester: number;

  @IsNumber()
  @IsNotEmpty()
  readonly first_choice_area_id: number;

  @IsNumber()
  @IsNotEmpty()
  readonly second_choice_area_id: number;

  @IsString()
  @IsNotEmpty()
  readonly application_reason: string;
}
