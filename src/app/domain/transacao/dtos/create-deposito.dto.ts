import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateDepositoDto {
  @IsNotEmpty()
  @IsNumber()
  readonly valor: number;
}
