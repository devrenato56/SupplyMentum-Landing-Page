import { IsEmail, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class ApplicationDto {
  @ApiProperty({
    example: 'Juan',
  })
  @IsString()
  @IsNotEmpty()
  readonly first_name!: string;

  @ApiProperty({
    example: 'Pérez',
  })
  @IsString()
  @IsNotEmpty()
  readonly last_name!: string;

  @IsString()
  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  @ApiProperty({
    example: '987654321',
  })
  @IsString()
  @IsNotEmpty()
  readonly phone!: string;

  @ApiProperty({
    example: 'Ingeniería de Sistemas',
  })
  @IsString()
  @IsNotEmpty()
  readonly career!: string;

  @IsNumber()
  @IsNotEmpty()
  readonly university_semester: number;

  @IsNumber()
  @IsNotEmpty()
  readonly first_choice_area_id: number;

  @IsNumber()
  @IsNotEmpty()
  readonly second_choice_area_id: number;

  @ApiProperty({
    example: 'Me interesa formar parte de la organización.',
  })
  @IsString()
  @IsNotEmpty()
  readonly application_reason!: string;

  @ApiPropertyOptional({
    example: 2,
    nullable: true,
  })
  @IsOptional()
  @IsInt()
  readonly second_choice_area_id?: number;
}
