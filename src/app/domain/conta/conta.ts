export class Conta {
  id: number;
  nome: string;
  email: string;
  senha: string;
  saldo: number;
  papel: Role;
}

export enum Role {
  Usuario = 'USUARIO',
  Admin = 'ADMIN',
}
