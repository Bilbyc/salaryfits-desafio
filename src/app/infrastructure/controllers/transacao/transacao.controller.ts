import { Body, Controller, Get, HttpException, HttpStatus, Post, Query, Req, Res } from "@nestjs/common";
import { TransacaoService } from '../../../services/transacao.service';
import { Request, Response } from 'express';
import { CreateTransferenciaDto } from '../../../domain/transacao/dtos/create-transferencia.dto';
import { CreateMovimentacaoDto } from '../../../domain/transacao/dtos/create-movimentacao.dto';
import { RelatorioFiltroDto } from '../../../domain/transacao/dtos/relatorio-filtro.dto';
import { Roles } from '../../adapters/authorization/role.decorator';
import { Role } from '../../../domain/conta/conta';
import { RelatorioFiltroUserDto } from "../../../domain/transacao/dtos/relatorio-filtro-user.dto";

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

  @Roles(Role.Admin)
  @Get('/listAllTransacoes')
  async listAllTransacoes(
    @Res() res: Response,
    @Query() params?: RelatorioFiltroDto,
  ): Promise<void> {
    try {
      const result = await this.transacaoService.listaTransacoes(params);

      res.status(HttpStatus.OK).send(result);
    } catch (error) {
      console.error('Erro duranta listagem de Transações: ', error.message);
      throw new HttpException(error.message, error.status).message;
    }
  }

  @Get('/listTransacoes')
  async listTransacoes(
    @Req() req: Request,
    @Res() res: Response,
    @Query() params?: RelatorioFiltroUserDto,
  ): Promise<void> {
    try {
      const result = await this.transacaoService.listaTransacoesConta(
        params,
        req['conta'].email,
      );
      res.status(HttpStatus.OK).send(result);
    } catch (error) {
      console.error('Erro duranta listagem de Transações: ', error.message);
      throw new HttpException(error.message, error.status).message;
    }
  }
}
