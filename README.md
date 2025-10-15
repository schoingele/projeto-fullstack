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

