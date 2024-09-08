import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { CreateContaDto } from '../../../domain/conta/dtos/create-conta.dto';
import { Response } from 'express';

@Controller('api/conta')
export class ContaController {
  @Post()
  async createConta(
    @Body() createContaDto: CreateContaDto,
    @Res() res: Response,
  ): Promise<void> {
    console.log(createContaDto);
    res.status(HttpStatus.CREATED).send(createContaDto);
  }
}
