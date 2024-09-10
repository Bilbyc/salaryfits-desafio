import { Body, Controller, HttpStatus, Post, Req, Res } from '@nestjs/common';
import { TransacaoService } from '../../../services/transacao.service';
import { Request, Response } from 'express';
import { CreateTransferenciaDto } from '../../../domain/transacao/dtos/create-transferencia.dto';
import { CreateMovimentacaoDto } from '../../../domain/transacao/dtos/create-movimentacao.dto';

@Controller('api/transacao')
export class TransacaoController {
  constructor(private transacaoService: TransacaoService) {}
  @Post('/transferir')
  async transferirSaldo(
    @Body() transferenciaDto: CreateTransferenciaDto,
    @Res() res: Response,
    @Req() req: Request,
  ): Promise<void> {
    const contaEmail: string = req['conta'].email;
    const transacao = await this.transacaoService.createTransferencia(
      transferenciaDto,
      contaEmail,
    );
    res.status(HttpStatus.OK).send(transacao);
  }
  @Post('/depositar')
  async depositarSaldo(
    @Body() valor: CreateMovimentacaoDto,
    @Res() res: Response,
    @Req() req: Request,
  ): Promise<void> {
    const contaEmail: string = req['conta'].email;
    const conta = await this.transacaoService.depositar(valor, contaEmail);

    res.status(HttpStatus.OK).send(conta);
  }

  @Post('/sacar')
  async sacarSaldo(
    @Body() valor: CreateMovimentacaoDto,
    @Res() res: Response,
    @Req() req: Request,
  ): Promise<void> {
    const contaEmail: string = req['conta'].email;

    const conta = await this.transacaoService.sacarValor(valor, contaEmail);

    res.status(HttpStatus.OK).send(conta);
  }
}
