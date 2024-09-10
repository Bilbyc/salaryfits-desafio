import { IsBoolean, IsNotEmpty, IsNumber } from 'class-validator';

export class ResponseAtivacaoContaDto {
  @IsNumber()
  readonly id: number;
  @IsNotEmpty()
  @IsBoolean()
  readonly ativada: boolean;
}
