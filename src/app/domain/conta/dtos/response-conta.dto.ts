import {
  IsBoolean,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';
import { Role } from '../conta';
import { Exclude } from 'class-transformer';

export class ResponseContaDto {
  @IsNumber()
  readonly id: number;
  @IsNotEmpty()
  @IsString()
  readonly nome: string;
  @IsNotEmpty()
  @IsEmail()
  @IsString()
  readonly email: string;
  @IsNotEmpty()
  @IsString()
  readonly saldo: number;
  @IsNotEmpty()
  @IsEnum(Role)
  readonly papel: Role;
  @Exclude()
  readonly senha: string;
  @IsBoolean()
  readonly ativada: boolean;
}
