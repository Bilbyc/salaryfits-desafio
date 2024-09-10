import { IsEnum, IsNotEmpty, IsNumber, IsOptional } from "class-validator";
import { StatusTransacao, TipoOperacao } from '../transacao';

export class CreateTransferenciaDto {
  @IsNotEmpty()
  @IsNumber()
  readonly destinatario_id: number;
  @IsNotEmpty()
  @IsNumber()
  readonly valor: number;
  @IsOptional()
  @IsEnum(TipoOperacao)
  tipoOperacao?;
  @IsOptional()
  @IsEnum(StatusTransacao)
  status?;
}
