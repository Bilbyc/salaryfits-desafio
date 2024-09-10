import { IsDate, IsEnum, IsNotEmpty, IsNumber } from 'class-validator';
import { TipoOperacao } from '../../transacao/transacao';

export class CreateHistoricoTransacaoDto {
  @IsNotEmpty()
  @IsNumber()
  readonly contaId: number;
  @IsNotEmpty()
  @IsNumber()
  readonly transacaoId: number;
  @IsNotEmpty()
  @IsDate()
  readonly dataTransacao: Date;
  @IsEnum(TipoOperacao)
  readonly tipoOperacao: TipoOperacao;
}
