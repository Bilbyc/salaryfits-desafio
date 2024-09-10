import { Body, Controller, Get, HttpStatus, Param, Patch, Post, Res } from "@nestjs/common";
import { CreateContaDto } from "../../../domain/conta/dtos/create-conta.dto";
import { Response } from "express";
import { ContaService } from "../../../services/conta.service";
import { Roles } from "../../adapters/authorization/role.decorator";
import { Role } from "../../../domain/conta/conta";
import { ResponseSaldoContaDto } from "../../../domain/conta/dtos/response-saldo-conta.dto";

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

  @Roles(Role.Admin)
  @Patch('/atualizaAtivacao/:id')
  async updateAtivacaoConta(
    @Param('id') id: string,
    @Res() res: Response,
  ): Promise<void> {
    const result = await this.contaService.updateAtivacaoConta(id);

    res
      .status(HttpStatus.OK)
      .send(
        `Conta - ID: ${result.id} atualizada para status: Ativada = ${result.ativada}`,
      );
  }

  @Roles(Role.Admin)
  @Get('/checaSaldo/:id')
  async getSaldoConta(
    @Param('id') id: string,
    @Res() res: Response,
  ): Promise<void> {
    const result: ResponseSaldoContaDto = await this.contaService.getSaldo(id);

    res.status(HttpStatus.OK).send(result);
  }
}
