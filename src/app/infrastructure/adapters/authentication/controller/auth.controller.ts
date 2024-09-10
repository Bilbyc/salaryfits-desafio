import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
  Res,
} from '@nestjs/common';
import { AuthService } from '../service/auth.service';
import { LoginDto } from '../../../../domain/conta/dtos/login.dto';
import { Response } from 'express';
import { Public } from '../public.decorator';
import { SkipThrottle } from '@nestjs/throttler';

@SkipThrottle()
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post('/login')
  async login(@Body() loginDto: LoginDto, @Res() res: Response): Promise<void> {
    try {
      const result = await this.authService.logar(loginDto);
      res.status(HttpStatus.OK).send(result);
    } catch (error) {
      console.error('Erro durante tentativa de login: ', error.message);
      throw new HttpException(error.message, error.status).message;
    }
  }
}
