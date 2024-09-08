export class Conta {
  id: number;
  nome: string;
  email: string;
  senha: string;
  papel: Role;
}

export enum Role {
  Usuario = 'USUARIO',
  Admin = 'ADMIN',
}
