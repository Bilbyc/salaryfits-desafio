import { Transform } from 'class-transformer';
import { IsDate, IsEnum, IsOptional } from 'class-validator';
import { TipoOperacao } from '../transacao';

export class RelatorioFiltroDto {
  @IsOptional()
  @Transform(({ value }) => new Date(value))
  @IsDate()
  dataInicial?: string;

  @IsOptional()
  @Transform(({ value }) => new Date(value))
  @IsDate()
  dataFinal?: Date;

  @IsOptional()
  @IsEnum(TipoOperacao)
  tipoOperacao?: TipoOperacao;
}
