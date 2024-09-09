import {
  Body,
  Controller,
  HttpStatus,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import { TransacaoService } from '../../../services/transacao.service';
import { Response } from 'express';
import { CreateTransferenciaDto } from '../../../domain/transacao/dtos/create-transferencia.dto';
import { AuthGuard } from '../../adapters/auth/auth.guard';

@Controller('api/transacao')
export class TransacaoController {
  constructor(private transacaoService: TransacaoService) {}
  @UseGuards(AuthGuard)
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
