import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { AuthService } from '../service/auth.service';
import { LoginDto } from '../../../../domain/conta/dtos/login.dto';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/login')
  async login(@Body() loginDto: LoginDto, @Res() res: Response): Promise<void> {
    const result = await this.authService.logar(loginDto);
    res.status(HttpStatus.OK).send(result);
  }
}
