<h1 align="center">
    <a href="https://imgbb.com/"><img src="https://media-exp1.licdn.com/dms/image/C4D0BAQH-JFz_c5nxLA/company-logo_200_200/0/1662658756755?e=1673481600&v=beta&t=aWOsLYKZ7gXAtt4HvnPreSi8ZOV30dnhRh9mQse5UhA" alt="logo-web" border="0"></a>
    <br>
    Desafio técnico desenvolvido para o processo seletivo da empresa Hubla.
</h1>

## Pré requisitos

- Ter o banco de dados `Postgres` instalado na máquina
- Criar um novo database com o nome de sua preferência

## Como executar o projeto

Primeiramente, renomeie o arquivo `.env.example` para `.env`.

Na variável de ambiente `DATABASE_URL` você deverá mudar as credenciais da string de conexão para a sua, por exemplo:

```js
DATABASE_URL =
  'postgresql://meu_usuario_postgres:minha_senha_postgres@localhost:5432/nome_do_banco?schema=public';
```

Instalando as dependências:

```bash
$ npm install
```

Executando as migrations do banco de dados

```bash
npm run prisma:migrate
```

Iniciando o projeto:

```bash
$ npm run start:dev
```

## Testes

Nessa api temos 2 tipos de testes, `unitário` e de `integração`.

Executando os testes unitários:

```bash
$ npm run test:unit
```

Executando os testes de integração:

```bash
$ npm run test:integration
```

Executando todos os testes:

```bash
$ npm run test:all
```

Verificando a cobertura dos testes:

```bash
$ npm run test:coverage
```

## Rotas disponíveis

Observação: Para facilitar os testes das rotas da api, na mesma pasta do projeto terá um arquivo chamado `HUBLA.postman_collection.json` que será a collection com todas as rotas da aplicação;

GET /health

```txt
Descrição: Verifica integridade da api

Caso de sucesso:
- status code: 200
- body: {
  "message": "ok"
}

```

POST /transaction

```txt
Descrição: Insere transações através de um arquivo

Request:
- nome da chave: transactions
- tipo de dados a ser enviado: form-data

Caso de sucesso:
- status code: 201
- body: [{
  "type": number,
  "date": string,
  "productName": string,
  "seller": string,
  "value": number
}]

Caso de erro não enviando arquivo:
- status code: 400
- body: {
    "code": "INPUT_FILE",
    "message": "file is required."
}

Caso de erro enviando arquivo com extensão inválida:
- status code: 400
- body: {
    "code": "EXTENSION_FILE",
    "message": "only txt extension is allowed."
}

```

GET /transaction

```txt
Descrição: Lista todas as transações

Caso de sucesso:
- status code: 200
- body: [{
  "type": number,
  "date": string,
  "productName": string,
  "seller": string,
  "value": number
}]

```

GET /transaction/:type

```txt
Descrição: Lista todas as transações pelo tipo da transação

Params:
- type: 1, 2, 3 ou 4

Caso de sucesso:
- status code: 200
- body: [{
  "type": number,
  "date": string,
  "productName": string,
  "seller": string,
  "value": number
}]

Caso de erro com tipo inválido:
- status code: 400
- body: {
  "code": "TRANSACTION_TYPE",
  "message": "informed type does not exists."
}

```

## Arquitetura

```
tests
├───contracts
├───docs
├───factories
├───integration
├───mocks
├───requests
├───unit
├───utils
src
├───config
├───enums
├───helpers
├───infra
│   ├───databases
│   │   └───prisma
│   │       ├───migrations
│   │       └───repositories
│   └───server
├───middlewares
│   └───transaction
│       ├───controllers
│       ├───protocols
│       └───usecases
├───routes
└───temp
```

<h4 align="center">Made with 💚 by Cassio Oliveira</h4>
