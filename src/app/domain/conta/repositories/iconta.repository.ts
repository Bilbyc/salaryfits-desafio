import { CreateContaDto } from '../dtos/create-conta.dto';
import { Conta } from '../conta';
import { ResponseAtivacaoContaDto } from '../dtos/update-ativacao-conta.dto';

export interface IContaRepository {
  create(payload: CreateContaDto): Promise<Conta>;
  findOneByEmail(email: string): Promise<Conta>;
  findOne(id: number): Promise<Conta>;
  depositarById(id: number, valor: number): Promise<boolean>;
  depositarByEmail(email: string, valor: number): Promise<boolean>;
  sacarById(id: number, valor: number): Promise<boolean>;
  sacarByEmail(email: string, valor: number): Promise<boolean>;
  listContasAtivas(): Promise<Conta[]>;
  updateAtivacaoConta(
    id: number,
    statusAtual: boolean,
  ): Promise<ResponseAtivacaoContaDto>;
}

export const IContaRepository = Symbol('IContaRepository');
