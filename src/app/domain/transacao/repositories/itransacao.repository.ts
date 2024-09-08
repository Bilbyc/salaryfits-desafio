import { CreateTransferenciaDto } from '../dtos/create-transferencia.dto';
import { Transacao } from '../transacao';

export interface ITransacaoRepository {
  transferir(payload: CreateTransferenciaDto): Promise<Transacao>;
}

export const ITransacaoRepository = Symbol('ITransacaoRepository');
