import { Injectable } from '@nestjs/common';
import { IContaRepository } from '../../domain/conta/repositories/iconta.repository';
import { CreateContaDto } from '../../domain/conta/dtos/create-conta.dto';
import { Conta } from '../../domain/conta/conta';
import { PrismaService } from '../prisma/prisma.service';
import { plainToClass } from 'class-transformer';
import { Prisma } from '@prisma/client';

@Injectable()
export class ContaRepository implements IContaRepository {
  constructor(private prisma: PrismaService) {}
  async create(data: CreateContaDto): Promise<Conta> {
    const conta = await this.prisma.conta.create({ data });
    const contaTransformada = {
      ...conta,
      saldo: conta.saldo.toNumber(),
    };

    return plainToClass(Conta, contaTransformada);
  }

  async findOneByEmail(email: string): Promise<Conta> {
    const conta = await this.prisma.conta.findUnique({
      where: { email: email },
    });
    if (conta) {
      const contaTransformada = {
        ...conta,
        saldo: conta.saldo.toNumber(),
      };
      return plainToClass(Conta, contaTransformada);
    }
    return plainToClass(Conta, conta);
  }
  async findOne(id: number): Promise<Conta> {
    const conta = await this.prisma.conta.findUnique({
      where: { id: id },
    });
    if (conta) {
      const contaTransformada = {
        ...conta,
        saldo: conta.saldo.toNumber(),
      };
      return plainToClass(Conta, contaTransformada);
    }
    return plainToClass(Conta, conta);
  }
  async depositarById(id: number, valor: number): Promise<boolean> {
    await this.prisma.conta.update({
      where: {
        id: id,
      },
      data: {
        saldo: {
          increment: valor,
        },
      },
    });
    return true;
  }

  async depositarByEmail(email: string, valor: number): Promise<boolean> {
    await this.prisma.conta.update({
      where: {
        email: email,
      },
      data: {
        saldo: {
          increment: new Prisma.Decimal(valor),
        },
      },
    });
    return true;
  }

  async sacarByEmail(email: string, valor: number): Promise<boolean> {
    await this.prisma.conta.update({
      where: {
        email: email,
      },
      data: {
        saldo: {
          decrement: valor,
        },
      },
    });

    return true;
  }

  async sacarById(id: number, valor: number): Promise<boolean> {
    await this.prisma.conta.update({
      where: {
        id: id,
      },
      data: {
        saldo: {
          decrement: valor,
        },
      },
    });

    return true;
  }
}
