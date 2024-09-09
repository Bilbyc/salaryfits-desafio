import {
  Body,
  Controller,
  HttpStatus,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { TransacaoService } from '../../../services/transacao.service';
import { Request, Response } from 'express';
import { CreateTransferenciaDto } from '../../../domain/transacao/dtos/create-transferencia.dto';
import { AuthGuard } from '../../adapters/authentication/auth.guard';
import { Role } from '../../../domain/conta/conta';
import { Roles } from '../../adapters/authorization/role.decorator';
import { RolesGuard } from '../../adapters/authorization/roles.guard';

@Controller('api/transacao')
export class TransacaoController {
  constructor(private transacaoService: TransacaoService) {}
  @UseGuards(AuthGuard, RolesGuard)
  @Post('/transferir')
  @Roles(Role.Admin)
  async transferirSaldo(
    @Body() transferenciaDto: CreateTransferenciaDto,
    @Res() res: Response,
    @Req() req: Request,
  ): Promise<void> {
    console.log(req['conta']);
    const transacao =
      await this.transacaoService.createTransferencia(transferenciaDto);
    res.status(HttpStatus.OK).send(transacao);
  }
}
