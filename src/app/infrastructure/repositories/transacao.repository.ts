import { Injectable } from '@nestjs/common';
import { ITransacaoRepository } from '../../domain/transacao/repositories/itransacao.repository';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTransferenciaDto } from '../../domain/transacao/dtos/create-transferencia.dto';
import { Transacao } from '../../domain/transacao/transacao';
import { plainToClass } from 'class-transformer';

@Injectable()
export class TransacaoRepository implements ITransacaoRepository {
  constructor(private prisma: PrismaService) {}

  async transferir(data: CreateTransferenciaDto): Promise<Transacao> {
    const transacao = await this.prisma.transacao.create({ data });
    const transacaoComSaldoConvertido = {
      ...transacao,
      valor: transacao.valor.toNumber(),
    };
    return plainToClass(Transacao, transacaoComSaldoConvertido);
  }
}
