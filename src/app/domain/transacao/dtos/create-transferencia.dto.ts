import { IsEnum, IsNotEmpty, IsNumber } from 'class-validator';
import { StatusTransacao, TipoOperacao } from '../transacao';

export class CreateTransferenciaDto {
  @IsNotEmpty()
  @IsNumber()
  readonly destinatario_id: number;
  @IsNotEmpty()
  @IsNumber()
  readonly valor: number;
  @IsEnum(TipoOperacao)
  tipoOperacao;
  @IsEnum(StatusTransacao)
  status;
}
