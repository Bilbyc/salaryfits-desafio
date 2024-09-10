import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateMovimentacaoDto {
  @IsNotEmpty()
  @IsNumber()
  readonly valor: number;
}
