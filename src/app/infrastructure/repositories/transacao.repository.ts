import { Inject, Injectable } from '@nestjs/common';
import { ITransacaoRepository } from '../../domain/transacao/repositories/itransacao.repository';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTransferenciaDto } from '../../domain/transacao/dtos/create-transferencia.dto';
import { TipoOperacao, Transacao } from '../../domain/transacao/transacao';
import { plainToClass, plainToInstance } from 'class-transformer';
import { Conta } from '../../domain/conta/conta';
import { IContaRepository } from '../../domain/conta/repositories/iconta.repository';
import { CreateTransacaoDto } from '../../domain/transacao/dtos/create-transacao.dto';
import { IHistoricoTransacaoRepository } from '../../domain/historicoTransacao/repositories/ihistorico-transacao.repository';
import { CreateHistoricoTransacaoDto } from '../../domain/historicoTransacao/dtos/create-historico-transacao.dto';
import { RelatorioFiltroDto } from '../../domain/transacao/dtos/relatorio-filtro.dto';
import { RelatorioFiltroUserDto } from "../../domain/transacao/dtos/relatorio-filtro-user.dto";

@Injectable()
export class TransacaoRepository implements ITransacaoRepository {
  constructor(
    private prisma: PrismaService,
    @Inject(IContaRepository) private contaRepository: IContaRepository,
    @Inject(IHistoricoTransacaoRepository)
    private historicoTransacaoRepository: IHistoricoTransacaoRepository,
  ) {}

  async transferir(
    payload: CreateTransferenciaDto,
    conta: Conta,
  ): Promise<Transacao> {
    //const data = { ...payload, contaId: conta.id };
    const data: CreateTransacaoDto = {
      contaId: conta.id,
      destinatario_id: payload.destinatario_id,
      valor: payload.valor,
      tipoOperacao: payload.tipoOperacao,
      status: payload.status,
    };

    const transacao = await this.create(data);

    await this.contaRepository.sacarById(conta.id, payload.valor);

    await this.contaRepository.depositarById(
      payload.destinatario_id,
      payload.valor,
    );

    const dataHistorico: CreateHistoricoTransacaoDto = {
      contaId: conta.id,
      transacaoId: transacao.id,
      tipoOperacao: TipoOperacao.transferencia,
      dataTransacao: new Date(),
    };

    await this.historicoTransacaoRepository.create(dataHistorico);

    return plainToClass(Transacao, transacao);
  }

  async create(data: CreateTransacaoDto): Promise<Transacao> {
    const transacao = await this.prisma.transacao.create({ data });
    const transacaoComSaldoConvertido = {
      ...transacao,
      valor: transacao.valor.toNumber(),
    };

    return plainToClass(Transacao, transacaoComSaldoConvertido);
  }

  async list(data: RelatorioFiltroDto): Promise<Transacao[]> {
    const transacoes = await this.prisma.transacao.findMany({
      where: {
        ...(data.dataInicial ? { dataTransacao: { gte: new Date(data.dataInicial) } } : {}),
        ...(data.dataFinal ? { dataTransacao: { lte: new Date(data.dataFinal) } } : {}),
        ...(data.tipoOperacao ? { tipoOperacao: data.tipoOperacao } : {}),
      },
    });

    return transacoes.map((transacao) =>
      plainToInstance(Transacao, {
        ...transacao,
        valor: transacao.valor.toNumber(),
      }),
    );
  }

  async listByContaEmail(
    data: RelatorioFiltroUserDto,
    email: string,
  ): Promise<Transacao[]> {
    const conta = await this.contaRepository.findOneByEmail(email);
    const transacoes = await this.prisma.transacao.findMany({
      where: {
        contaId: conta.id,
        ...(data.dataInicial ? { dataTransacao: { gte: new Date(data.dataInicial) } } : {}),
        ...(data.dataFinal ? { dataTransacao: { lte: new Date(data.dataFinal) } } : {}),
      },
    });

    return transacoes.map((transacao) =>
      plainToInstance(Transacao, {
        ...transacao,
        valor: transacao.valor.toNumber(),
      }),
    );
  }
}
