import { CreateContaDto } from '../dtos/create-conta.dto';
import { Conta } from '../conta';

export interface IContaRepository {
  create(payload: CreateContaDto): Promise<Conta>;
  findOne(email: string): Promise<Conta>;
}

export const IContaRepository = Symbol('IContaRepository');
