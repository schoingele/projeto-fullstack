# API — Endpoints principais

## Auth
POST /auth/register
POST /auth/login

## Alunos
GET /alunos
GET /alunos/:id
POST /alunos
PUT /alunos/:id
PATCH /alunos/:id
DELETE /alunos/:id

## Cursos
GET /cursos
GET /cursos/:id
POST /cursos
PUT /cursos/:id
DELETE /cursos/:id
GET /cursos/:id/alunos

## Matrículas
POST /matriculas { alunoId, cursoId }
DELETE /matriculas/:id
