import { IsEnum, IsNotEmpty, IsNumber } from 'class-validator';
import { StatusTransacao, TipoOperacao } from '../transacao';

export class CreateTransacaoDto {
  @IsNotEmpty()
  @IsNumber()
  readonly contaId: number;
  @IsNotEmpty()
  @IsNumber()
  readonly valor: number;
  @IsEnum(TipoOperacao)
  tipoOperacao;
  @IsEnum(StatusTransacao)
  status;
}
