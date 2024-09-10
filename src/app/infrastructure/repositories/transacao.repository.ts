import { Inject, Injectable } from '@nestjs/common';
import { ITransacaoRepository } from '../../domain/transacao/repositories/itransacao.repository';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTransferenciaDto } from '../../domain/transacao/dtos/create-transferencia.dto';
import { Transacao } from '../../domain/transacao/transacao';
import { plainToClass } from 'class-transformer';
import { Conta } from '../../domain/conta/conta';
import { IContaRepository } from '../../domain/conta/repositories/iconta.repository';

@Injectable()
export class TransacaoRepository implements ITransacaoRepository {
  constructor(
    private prisma: PrismaService,
    @Inject(IContaRepository) private contaRepository: IContaRepository,
  ) {}

  async transferir(
    payload: CreateTransferenciaDto,
    conta: Conta,
  ): Promise<Transacao> {
    const data = { ...payload, contaId: conta.id };
    const transacao = await this.prisma.transacao.create({ data });
    const transacaoComSaldoConvertido = {
      ...transacao,
      valor: transacao.valor.toNumber(),
    };

    await this.contaRepository.sacarById(conta.id, payload.valor);
    await this.contaRepository.depositarById(
      payload.destinatario_id,
      payload.valor,
    );

    return plainToClass(Transacao, transacaoComSaldoConvertido);
  }
}
