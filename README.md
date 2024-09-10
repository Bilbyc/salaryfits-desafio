## Installation

```bash
# Clone this project

# Access project root folder
$ cd salaryfits-desafio-main

# Install dependencies
$ npm install

# Run docker
$ docker compose up

```
## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev
```

## Observações

```bash
# Autenticação
$ Token de Autenticação tem uma duração de 5 minutos

# Rate Limit
$ Rotas de operações de Transação (Saque, Depósito e Transferencia) possuem um limite de 5 requisições por minuto
```
📌 Endpoints
============
### Conta Endpoint
|       Route                       |    Method    |                   Description                       |                                                          
|   ---------------                 | :----------: |  -------------------------------------------------- |  
|  `/api/conta/criar`               |     POST     | Cria uma nova CONTA                               | 
```
$ Body
{
  "nome": "",
  "email": "",
  "senha": "",
  "papel": "ADMIN" (ADMIN/USUARIO)
}
```
### Conta Endpoints
|       Route                       |    Method    |                   Description                       |                                                          
|   ---------------                 | :----------: |  -------------------------------------------------- |  
|  `/api/conta/lista`               |     GET     | Lista todas as contas - **Rota de ADMIN**            | 
|  `/api/conta/atualizaAtivacao/:id` |     PATCH     | Ativa ou desativa a conta com o ID passado - **Rota de ADMIN**            | 
```
```
### Autenticação Endpoint
|       Route                       |    Method    |                   Description                       |                                                          
|   ---------------                 | :----------: |  -------------------------------------------------- |  
|  `/auth/login`                    |     POST     |  Loga em uma conta e recebe um **Bearer Token**                               | 
```
$ Body
{
  "email": "teste@email.com",
  "senha": "123",
}
```
### Transação Endpoint
|       Route                       |    Method    |                   Description                       |                                                          
|   ---------------                 | :----------: |  -------------------------------------------------- |  
|  `/api/transacao/depositar`               |     POST     | Deposita o valor na conta logada            | 
```
$ Body
{
  "valor": 10.50,
}
```
### Transação Endpoint
|       Route                       |    Method    |                   Description                       |                                                          
|   ---------------                 | :----------: |  -------------------------------------------------- |  
|  `/api/transacao/sacar`               |     POST     | Saca o valor da conta logada            | 
```
$ Body
{
  "valor": 5.50,
}
```
### Transação Endpoint
|       Route                       |    Method    |                   Description                       |                                                          
|   ---------------                 | :----------: |  -------------------------------------------------- |  
|  `/api/transacao/transferir`               |     POST     | Realiza uma transferencia para a conta destino           | 
```
$ Body
{
    "destinatario_id": 1,
    "valor": 5.00
}
```
### Transação Endpoint
|       Route                       |    Method    |                   Description                       |                                                          
|   ---------------                 | :----------: |  -------------------------------------------------- |  
|  `/api/transacao/listTransacoes`      |     GET     | Lista transações com filtros - **ROTA DE ADMIN**           | 

$ Exemplo filtros via URL

**URL** = *localhost:3001/api/transacao/listTransacoes?dataInicial=2024-09-10&dataFinal=2024-09-10&tipoOperacao=DEPOSITO*

**dataInicial** e **dataFinal**: estabelecem o período das Transações a serem retornadas

**tipoOperacao**: filtra o tipo de Transação a ser retornada. Valores possíveis: *DEPOSITO*,*TRANSFERENCIA*,*SAQUE*

### Transação Endpoint
|       Route                       |    Method    |                   Description                       |                                                          
|   ---------------                 | :----------: |  -------------------------------------------------- |  
|  `/api/transacao/listTransacoes`      |     GET     | Lista transações com filtros            | 

$ Exemplo filtros via URL

**URL** = localhost:3001/api/transacao/listTransacoes?dataInicial=2024-09-09&dataFinal=2024-09-09

**dataInicial** e **dataFinal**: estabelecem o período das Transações a serem retornadas
