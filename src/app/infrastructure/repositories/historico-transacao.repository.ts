import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { IHistoricoTransacaoRepository } from '../../domain/historicoTransacao/repositories/ihistorico-transacao.repository';
import { CreateHistoricoTransacaoDto } from '../../domain/historicoTransacao/dtos/create-historico-transacao.dto';

@Injectable()
export class HistoricoTransacaoRepository
  implements IHistoricoTransacaoRepository
{
  constructor(
    private prisma: PrismaService,
  ) {}

  async create(data: CreateHistoricoTransacaoDto): Promise<boolean> {
    await this.prisma.historicoTransacao.create({ data });

    return true;
  }
}
