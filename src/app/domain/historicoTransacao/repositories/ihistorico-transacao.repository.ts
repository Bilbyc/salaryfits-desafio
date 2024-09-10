import { CreateHistoricoTransacaoDto } from '../dtos/create-historico-transacao.dto';

export interface IHistoricoTransacaoRepository {
  create(data: CreateHistoricoTransacaoDto): Promise<boolean>;
}

export const IHistoricoTransacaoRepository = Symbol(
  'IHistoricoTransacaoRepository',
);
