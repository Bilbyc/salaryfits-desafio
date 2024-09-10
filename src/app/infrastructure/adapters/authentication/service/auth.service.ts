import {
  BadRequestException,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { LoginDto } from '../../../../domain/conta/dtos/login.dto';
import { IContaRepository } from '../../../../domain/conta/repositories/iconta.repository';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @Inject(IContaRepository) private contaRepository: IContaRepository,
    private jwtService: JwtService,
  ) {}

  async logar(payload: LoginDto): Promise<any> {
    const conta = await this.contaRepository.findOneByEmail(payload.email);
    if (!conta) {
      throw new BadRequestException('Conta não encontrada');
    }
    if (conta.senha !== payload.senha) {
      throw new UnauthorizedException('Credenciais incorretas');
    }
    if (!conta.ativada) {
      throw new BadRequestException('Conta desativada - Não é possível logar');
    }
    payload['papel'] = conta.papel;
    return {
      acess_token: await this.jwtService.signAsync(payload),
    };
  }
}
