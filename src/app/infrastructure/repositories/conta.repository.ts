import { Injectable } from '@nestjs/common';
import { IContaRepository } from '../../domain/conta/repositories/iconta.repository';
import { CreateContaDto } from '../../domain/conta/dtos/create-conta.dto';
import { Conta } from '../../domain/conta/conta';
import { PrismaService } from '../prisma/prisma.service';
import { plainToClass } from 'class-transformer';

@Injectable()
export class ContaRepository implements IContaRepository {
  constructor(private prisma: PrismaService) {}
  async create(data: CreateContaDto): Promise<Conta> {
    const conta = await this.prisma.conta.create({ data });

    return plainToClass(Conta, conta);
  }
}
