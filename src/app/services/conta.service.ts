import { Inject, Injectable } from '@nestjs/common';
import { CreateContaDto } from '../domain/conta/dtos/create-conta.dto';
import { Conta } from '../domain/conta/conta';
import { IContaRepository } from '../domain/conta/repositories/iconta.repository';

@Injectable()
export class ContaService {
  constructor(
    @Inject(IContaRepository) private contaRepository: IContaRepository,
  ) {}
  async createConta(payload: CreateContaDto): Promise<Conta> {
    return await this.contaRepository.create(payload);
  }
}
