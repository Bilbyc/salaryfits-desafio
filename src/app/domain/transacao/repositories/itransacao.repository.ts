import { CreateTransferenciaDto } from '../dtos/create-transferencia.dto';
import { Transacao } from '../transacao';
import { Conta } from '../../conta/conta';
import { CreateTransacaoDto } from '../dtos/create-transacao.dto';
import { RelatorioFiltroDto } from '../dtos/relatorio-filtro.dto';

export interface ITransacaoRepository {
  transferir(payload: CreateTransferenciaDto, conta: Conta): Promise<Transacao>;
  create(data: CreateTransacaoDto): Promise<Transacao>;
  list(data: RelatorioFiltroDto): Promise<Transacao[]>;
}

export const ITransacaoRepository = Symbol('ITransacaoRepository');
