import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { TransacaoService } from '../../../services/transacao.service';
import { Response } from 'express';
import { CreateTransferenciaDto } from '../../../domain/transacao/dtos/create-transferencia.dto';

@Controller('api/transacao')
export class TransacaoController {
  constructor(private transacaoService: TransacaoService) {}
  @Post('/transferir')
  async transferirSaldo(
    @Body() transferenciaDto: CreateTransferenciaDto,
    @Res() res: Response,
  ): Promise<void> {
    const transacao =
      await this.transacaoService.createTransferencia(transferenciaDto);
    res.status(HttpStatus.OK).send(transacao);
  }
}
