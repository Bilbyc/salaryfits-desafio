import { CreateTransferenciaDto } from '../dtos/create-transferencia.dto';
import { Transacao } from '../transacao';
import { Conta } from '../../conta/conta';

export interface ITransacaoRepository {
  transferir(payload: CreateTransferenciaDto, conta: Conta): Promise<Transacao>;
}

export const ITransacaoRepository = Symbol('ITransacaoRepository');
