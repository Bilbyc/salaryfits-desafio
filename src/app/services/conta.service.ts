import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { CreateContaDto } from '../domain/conta/dtos/create-conta.dto';
import { Conta } from '../domain/conta/conta';
import { IContaRepository } from '../domain/conta/repositories/iconta.repository';
import { ResponseContaDto } from '../domain/conta/dtos/response-conta.dto';
import { plainToInstance } from 'class-transformer';
import { ResponseAtivacaoContaDto } from '../domain/conta/dtos/update-ativacao-conta.dto';

@Injectable()
export class ContaService {
  constructor(
    @Inject(IContaRepository) private contaRepository: IContaRepository,
  ) {}
  async createConta(payload: CreateContaDto): Promise<Conta> {
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
}
