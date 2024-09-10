import { CreateTransferenciaDto } from '../dtos/create-transferencia.dto';
import { Transacao } from '../transacao';
import { Conta } from '../../conta/conta';
import { CreateTransacaoDto } from '../dtos/create-transacao.dto';

export interface ITransacaoRepository {
  transferir(payload: CreateTransferenciaDto, conta: Conta): Promise<Transacao>;
  create(data: CreateTransacaoDto): Promise<boolean>;
}

export const ITransacaoRepository = Symbol('ITransacaoRepository');
