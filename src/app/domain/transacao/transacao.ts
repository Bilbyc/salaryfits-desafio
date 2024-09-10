import { Conta } from '../conta/conta';

export class Transacao {
  id: number;
  contaId: Conta;
  valor: number;
  destinatario_id: number;
  tipoOperacao: TipoOperacao;
  dataTransacao: Date;
  status: StatusTransacao;
}

export enum TipoOperacao {
  deposito = 'DEPOSITO',
  saque = 'SAQUE',
  transferencia = 'TRANSFERENCIA',
}

export enum StatusTransacao {
  aceita = 'ACEITA',
  recusada = 'RECUSADA',
}
