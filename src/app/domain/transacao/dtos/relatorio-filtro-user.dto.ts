import { IsDate, IsOptional } from 'class-validator';
import { Transform } from 'class-transformer';

export class RelatorioFiltroUserDto {
  @IsOptional()
  @Transform(({ value }) => new Date(value))
  @IsDate()
  dataInicial?: Date;

  @IsOptional()
  @Transform(({ value }) => new Date(value))
  @IsDate()
  dataFinal?: Date;
}
