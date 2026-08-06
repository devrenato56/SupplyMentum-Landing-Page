import { IsNotEmpty, IsNumber, Min } from 'class-validator';

export class UpdateOrderDto {
  @IsNumber()
  @Min(1)
  @IsNotEmpty()
  readonly id: number;

  @IsNumber()
  @Min(1)
  @IsNotEmpty()
  readonly orden: number;
}
