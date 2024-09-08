import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { CreateContaDto } from '../../../domain/conta/dtos/create-conta.dto';
import { Response } from 'express';
import { ContaService } from '../../../services/conta.service';

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
}
