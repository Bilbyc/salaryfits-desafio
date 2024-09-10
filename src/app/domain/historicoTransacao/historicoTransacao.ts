import { TipoOperacao, Transacao } from '../transacao/transacao';
import { Conta } from '../conta/conta';

export class HistoricoTransacao {
  id: number;
  contaId: Conta;
  transacaoId: Transacao;
  dataTransacao: Date;
  tipoOperacao: TipoOperacao;
}
