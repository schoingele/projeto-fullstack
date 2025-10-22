# Backend Cursos — Projeto Completo

## O que tem aqui
- Node.js + TypeScript + Express
- TypeORM + PostgreSQL
- JWT Authentication
- Docker + docker-compose (Postgres + pgAdmin)
- Insomnia collection pronta
- Seed para popular o banco com dados de exemplo
- Tests (Jest + Supertest) exemplos

## Rodando com Docker
1. Copie `.env.example` para `.env` e ajuste se quiser.
2. Suba o Postgres e pgAdmin:
   ```bash
   docker-compose up -d
   ```
3. Instale dependências:
   ```bash
   npm install
   ```
4. Rode a API em modo dev:
   ```bash
   npm run dev
   ```
5. Rode o seed para popular dados:
   ```bash
   npm run seed
   ```

## Segurança

O projeto segue boas práticas de segurança: as dependências são monitoradas e há mecanismos para aplicar correções quando necessário. Recomenda-se manter as variáveis de ambiente seguras e atualizar dependências para versões oficiais assim que houver correções upstream.

## Quick start (rápido)

1. Copie `.env.example` para `.env` e ajuste se necessário.
2. Instale dependências:
   ```bash
   npm install
   ```
3. Inicie em modo de desenvolvimento:
   ```bash
   npm run dev
   ```
4. Opcional: popular dados de exemplo (seed):
   ```bash
   npm run seed
   ```


## Autenticação

- Endpoints principais:
   - POST /auth/register — cria um usuário (body: { nome, email, senha })
   - POST /auth/login — gera JWT (body: { email, senha })

- Uso rápido:
   1. Faça POST em `/auth/login` com credenciais válidas; a resposta contém `{ "token": "..." }`.
   2. Em requisições protegidas, envie o header `Authorization: Bearer <token>`.


## Endpoints principais
- POST /auth/register
- POST /auth/login
- GET /alunos
- POST /alunos
- GET /cursos
- POST /cursos
- POST /matriculas

## Importar Insomnia
Importe o arquivo `insomnia_collection.json` no Insomnia.

