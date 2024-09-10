import { CreateTransferenciaDto } from '../dtos/create-transferencia.dto';
import { Transacao } from '../transacao';
import { Conta } from '../../conta/conta';
import { CreateTransacaoDto } from '../dtos/create-transacao.dto';
import { RelatorioFiltroDto } from '../dtos/relatorio-filtro.dto';
import { RelatorioFiltroUserDto } from '../dtos/relatorio-filtro-user.dto';

export interface ITransacaoRepository {
  transferir(payload: CreateTransferenciaDto, conta: Conta): Promise<Transacao>;
  create(data: CreateTransacaoDto): Promise<Transacao>;
  list(data: RelatorioFiltroDto): Promise<Transacao[]>;
  listByContaEmail(
    data: RelatorioFiltroUserDto,
    email: string,
  ): Promise<Transacao[]>;
}

export const ITransacaoRepository = Symbol('ITransacaoRepository');
