import { Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import { LoginDto } from '../../../../domain/conta/dtos/login.dto';
import { IContaRepository } from '../../../../domain/conta/repositories/iconta.repository';

@Injectable()
export class AuthService {
  constructor(
    @Inject(IContaRepository) private contaRepository: IContaRepository
  ) {}

  async logar(payload: LoginDto): Promise<any> {
    const conta = await this.contaRepository.findOne(payload.email);
    if (!conta) {
      console.info('Usuário não encontrado');
      return;
    }
    if (conta.senha !== payload.senha) {
      throw new UnauthorizedException();
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { senha, ...result } = conta;
    return result;
  }
}
