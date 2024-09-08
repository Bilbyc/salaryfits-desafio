export class Transacao {
  id: number;
  valor: number;
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
