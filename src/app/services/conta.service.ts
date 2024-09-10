import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { CreateContaDto } from '../domain/conta/dtos/create-conta.dto';
import { Conta } from '../domain/conta/conta';
import { IContaRepository } from '../domain/conta/repositories/iconta.repository';
import { ResponseContaDto } from '../domain/conta/dtos/response-conta.dto';
import { plainToInstance } from 'class-transformer';
import { ResponseAtivacaoContaDto } from '../domain/conta/dtos/update-ativacao-conta.dto';
import { ResponseSaldoContaDto } from '../domain/conta/dtos/response-saldo-conta.dto';

@Injectable()
export class ContaService {
  constructor(
    @Inject(IContaRepository) private contaRepository: IContaRepository,
  ) {}
  async createConta(payload: CreateContaDto): Promise<Conta> {
    const conta = await this.contaRepository.findOneByEmail(payload.email);
    if (conta) {
      throw new BadRequestException('O email informado já possui uma conta');
    }
    return await this.contaRepository.create(payload);
  }

  async listaContas(): Promise<ResponseContaDto[]> {
    const contasAtivas = await this.contaRepository.listContasAtivas();

    return contasAtivas.map((conta) =>
      plainToInstance(ResponseContaDto, conta),
    );
  }

  async updateAtivacaoConta(id: string): Promise<ResponseAtivacaoContaDto> {
    const idToNumber = Number(id);
    if (isNaN(idToNumber)) {
      throw new BadRequestException('Id recebido deve ser um número');
    }
    const conta = await this.contaRepository.findOne(idToNumber);

    if (!conta) {
      throw new BadRequestException(
        'Id informado não corresponde a nenhuma conta',
      );
    }

    return await this.contaRepository.updateAtivacaoConta(
      idToNumber,
      conta.ativada,
    );
  }

  async getSaldo(id: string): Promise<ResponseSaldoContaDto> {
    const idToNumber = Number(id);
    if (isNaN(idToNumber)) {
      throw new BadRequestException('Id recebido deve ser um número');
    }

    const conta = await this.contaRepository.findOne(idToNumber);

    if (!conta) {
      throw new BadRequestException(
        'Id informado não corresponde a nenhuma conta',
      );
    }

    return {
      nome: conta.nome,
      email: conta.email,
      saldo: conta.saldo,
    };
  }
}
