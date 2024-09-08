import { IsEmail, IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { Role } from '../conta';

export class CreateContaDto {
  @IsNotEmpty()
  @IsString()
  readonly nome: string;
  @IsNotEmpty()
  @IsEmail()
  @IsString()
  readonly email: string;
  @IsNotEmpty()
  @IsString()
  readonly senha: string;
  @IsNotEmpty()
  @IsEnum(Role)
  readonly papel: Role;
}
