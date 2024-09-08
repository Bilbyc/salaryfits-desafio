import { Inject, Injectable } from '@nestjs/common';
import { ITransacaoRepository } from '../domain/transacao/repositories/itransacao.repository';
import { CreateTransferenciaDto } from '../domain/transacao/dtos/create-transferencia.dto';
import {
  StatusTransacao,
  TipoOperacao,
  Transacao,
} from '../domain/transacao/transacao';

@Injectable()
export class TransacaoService {
  constructor(
    @Inject(ITransacaoRepository)
    private transacaoRepository: ITransacaoRepository,
  ) {}
  async createTransferencia(
    payload: CreateTransferenciaDto,
  ): Promise<Transacao> {
    payload.tipoOperacao = TipoOperacao.transferencia;
    payload.status = StatusTransacao.aceita;
    return await this.transacaoRepository.transferir(payload);
  }
}
