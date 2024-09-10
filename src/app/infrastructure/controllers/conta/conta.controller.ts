import { Body, Controller, Get, HttpStatus, Post, Res } from '@nestjs/common';
import { CreateContaDto } from '../../../domain/conta/dtos/create-conta.dto';
import { Response } from 'express';
import { ContaService } from '../../../services/conta.service';
import { Roles } from '../../adapters/authorization/role.decorator';
import { Role } from '../../../domain/conta/conta';

@Controller('api/conta')
export class ContaController {
  constructor(private contaService: ContaService) {}
  @Post('/criar')
  async createConta(
    @Body() createContaDto: CreateContaDto,
    @Res() res: Response,
  ): Promise<void> {
    const conta = await this.contaService.createConta(createContaDto);
    res.status(HttpStatus.CREATED).send(conta);
  }

  @Roles(Role.Admin)
  @Get('/listar')
  async listarContas(@Res() res: Response): Promise<void> {
    const listaContas = await this.contaService.listaContas();
    res.status(HttpStatus.OK).send(listaContas);
  }
}
