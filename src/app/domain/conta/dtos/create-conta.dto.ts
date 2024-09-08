import { IsEmail, IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { Role } from '../conta';

export class CreateContaDto {
  @IsNotEmpty()
  @IsString()
  readonly nome: string;
  @IsNotEmpty()
  @IsEmail()
  @IsString()
  email: string;
  @IsNotEmpty()
  @IsString()
  senha: string;
  @IsNotEmpty()
  @IsEnum(Role)
  papel: Role;
}
