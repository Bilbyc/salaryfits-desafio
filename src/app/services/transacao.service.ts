import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ITransacaoRepository } from '../domain/transacao/repositories/itransacao.repository';
import { CreateTransferenciaDto } from '../domain/transacao/dtos/create-transferencia.dto';
import {
  StatusTransacao,
  TipoOperacao,
  Transacao,
} from '../domain/transacao/transacao';
import { IContaRepository } from '../domain/conta/repositories/iconta.repository';
import { Conta } from '../domain/conta/conta';
import { CreateTransacaoDto } from '../domain/transacao/dtos/create-transacao.dto';
import { CreateMovimentacaoDto } from '../domain/transacao/dtos/create-movimentacao.dto';
import { ResponseContaDto } from '../domain/conta/dtos/response-conta.dto';
import { plainToInstance } from "class-transformer";
import {
  IHistoricoTransacaoRepository
} from "../domain/historicoTransacao/repositories/ihistorico-transacao.repository";
import { CreateHistoricoTransacaoDto } from "../domain/historicoTransacao/dtos/create-historico-transacao.dto";

@Injectable()
export class TransacaoService {
  constructor(
    @Inject(ITransacaoRepository)
    private transacaoRepository: ITransacaoRepository,
    @Inject(IContaRepository)
    private contaRepository: IContaRepository,
    @Inject(IHistoricoTransacaoRepository)
    private historicoTransacaoRepository: IHistoricoTransacaoRepository,
  ) {}
  async createTransferencia(
    payload: CreateTransferenciaDto,
    email: string,
  ): Promise<Transacao> {
    payload.tipoOperacao = TipoOperacao.transferencia;
    payload.status = StatusTransacao.aceita;
    const contaOrigem: Conta = await this.contaRepository.findOneByEmail(email);
    const contaDestinatario = await this.contaRepository.findOne(
      payload.destinatario_id,
    );
    if (!contaDestinatario) {
      throw new NotFoundException('Conta de destinatário não existe');
    }

    if (contaOrigem.saldo - payload.valor < 0) {
      throw new BadRequestException('Sem saldo suficiente');
    }
    return await this.transacaoRepository.transferir(payload, contaOrigem);
  }
  async depositar(
    payload: CreateMovimentacaoDto,
    contaEmail: string,
  ): Promise<ResponseContaDto> {
    await this.contaRepository.depositarByEmail(contaEmail, payload.valor);

    const contaOrigem = await this.contaRepository.findOneByEmail(contaEmail);

    const data: CreateTransacaoDto = {
      contaId: contaOrigem.id,
      valor: payload.valor,
      tipoOperacao: TipoOperacao.deposito,
      status: StatusTransacao.aceita,
    };

    const transacao = await this.transacaoRepository.create(data);

    const dataHistorico: CreateHistoricoTransacaoDto = {
      contaId: contaOrigem.id,
      transacaoId: transacao.id,
      tipoOperacao: TipoOperacao.deposito,
      dataTransacao: new Date(),
    };

    await this.historicoTransacaoRepository.create(dataHistorico);

    return plainToInstance(ResponseContaDto, contaOrigem);
  }

  async sacarValor(
    payload: CreateMovimentacaoDto,
    contaEmail: string,
  ): Promise<ResponseContaDto> {
    let contaOrigem = await this.contaRepository.findOneByEmail(contaEmail);

    if (contaOrigem.saldo - payload.valor < 0) {
      throw new BadRequestException(
        'Não há saldo suficiente para a operação solicitada',
      );
    }
    await this.contaRepository.sacarByEmail(contaEmail, payload.valor);

    const data: CreateTransacaoDto = {
      contaId: contaOrigem.id,
      valor: payload.valor,
      tipoOperacao: TipoOperacao.saque,
      status: StatusTransacao.aceita,
    };

    await this.transacaoRepository.create(data);

    contaOrigem = await this.contaRepository.findOneByEmail(contaEmail);

    return plainToInstance(ResponseContaDto, contaOrigem);
  }
}
