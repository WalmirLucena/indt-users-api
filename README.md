# INDT Users API

- Este projeto consiste numa API para cadastro de usuários, listagem de usuários e atualização destes dados. Utiliza o framework NestsJS, que adota uma arquitetura modular, injenção de depedência e princípios SOLID. Feito para o processo seletivo de desenvolvedor fullStack do INDT.

# 🧰 Technologies

- API
  - NestJS
  - TypeScript
  - Jest
  - Docker
  - PostgreSQL
  - Eslint
  - TypeORM

# 🚀 Como Usar

### 💾 Clone o Repositório

```
- git clone git@github.com:WalmirLucena/bemol-onboarding-api.git
```

## Executando o projeto

É recomendável que você utilize o docker e docker-compose para rodar o projeto na sua máquina.

- Subindo os containeres com docker:

  ```
   - docker-compose up
  ```

  O Código acima deve subir o container tanto com a API quanto o Banco de Dados(Postgree)

  📋 Verifique o Servidor em http://localhost:3000

# Como Testar a Api

Os testes da API foram feitos usando jest, para rodar todos os testes rode o seguinte comando:

```
  yarn test
```

Para rodar um teste especifico:

```
  yarn test nomeDoArquivo
```

# Como logar na API?

- Após subir o projeto, é possivel logar com os seguintes usuários que foram adicionados ao banco no seed.

```json
{
  "user": { "email": "admin@gmail.com", "password": "Admin123" },
  "admin": { "email": "user@gmail.com", "password": "User123" }
}
```

# Rotas da API Auth

### Login

**POST** `/users`

Request Payload

```json
{
    "email": <string>,
    "password": <string>
}
```

Response Payload - HTTP STATUS 201

```json
{
	"token": <number>,
  "firstName": <string>,
  "accessLevel" <'Common' | 'Admin'>
}
```

Error Response - HTTP STATUS 400

```json
{
  "message": "Email or password incorrect",
  "error": "Bad Request",
  "statusCode": 400
}
```

# Rotas da API User

### CreateUsers

**POST** `/users`

Request Payload

```json
{
    "email": <string>,
    "password": <string>,
    "accessLevel": <'Common' | 'Admin'>,
	  "lastName": <string>,
	  "firstName": <string>,
}
```

Response Payload - HTTP STATUS 201

```json
{
   {
	"id": <number>,
	"email": <string>,
	"accessLevel": <'Common' | 'Admin'>,
	"lastName": <string>,
	"firstName": <string>,
}
}
```

Error Response - HTTP STATUS 400

```json
{
  "message": "User already exists",
  "error": "Bad Request",
  "statusCode": 400
}
```

Error Response - HTTP STATUS 401

```json
{
  "message": "Unauthorized"
}
```

### GetUsers

**GET** `/users/:id`

\*\*Caso envie o id no param, retorna um único item

Request Payload

```json
{}
```

Response Payload - HTTP STATUS 200

```json
[
   {
	"id": <number>,
	"email": <string>,
	"accessLevel": <'Common' | 'Admin'>,
	"lastName": <string>,
	"firstName": <string>,
  },
    {
	"id": <number>,
	"email": <string>,
	"accessLevel": <'Common' | 'Admin'>,
	"lastName": <string>,
	"firstName": <string>,
  }
]
```

Error Response - HTTP STATUS 401

```json
{
  "message": "Unauthorized"
}
```

### UpdateUsers

**PATCH** `/users/:id`

Request Payload

```json
{
  "email": <string>,
	"accessLevel": <'Common' | 'Admin'>,
  "deleted": <Date | null>
}
```

Response Payload - HTTP STATUS 200

```json
[]
```

Error Response - HTTP STATUS 401

```json
{
  "message": "Unauthorized"
}
```

### DeleteUsers

**DELETE** `/users/:id`

Request Payload

```json
{}
```

Response Payload - HTTP STATUS 200

```json
{
  {
	"raw": [],
	"affected": <number>,
  }
}
```

Error Response - HTTP STATUS 401

```json
{
  "message": "Unauthorized"
}
```
