import { Inject, Injectable } from '@nestjs/common';
import { ITransacaoRepository } from '../domain/transacao/repositories/itransacao.repository';
import { CreateTransferenciaDto } from '../domain/transacao/dtos/create-transferencia.dto';
import {
  StatusTransacao,
  TipoOperacao,
  Transacao,
} from '../domain/transacao/transacao';
import { IContaRepository } from '../domain/conta/repositories/iconta.repository';
import { Conta } from '../domain/conta/conta';

@Injectable()
export class TransacaoService {
  constructor(
    @Inject(ITransacaoRepository)
    private transacaoRepository: ITransacaoRepository,
    @Inject(IContaRepository)
    private contaRepository: IContaRepository,
  ) {}
  async createTransferencia(
    payload: CreateTransferenciaDto,
    email: string,
  ): Promise<Transacao> {
    payload.tipoOperacao = TipoOperacao.transferencia;
    payload.status = StatusTransacao.aceita;
    const conta: Conta = await this.contaRepository.findOne(email);
    return await this.transacaoRepository.transferir(payload, conta);
  }
}
