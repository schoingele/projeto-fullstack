---
name: Security advisory - validator/class-validator
about: Reportar e acompanhar a advisory sobre validator/class-validator usada pelo projeto
title: '[SECURITY] validator/class-validator advisory - ação recomendada'
labels: security, advisory
assignees: ''
---

## Resumo

Detectada advisory transitiva: `validator` (GHSA-9965-vmph-33xx) afetando `validator@<=13.15.15`, que é dependência do `class-validator` usado por este projeto.

## Contexto

- Pacote direto no projeto: `class-validator@0.14.2`
- Dependência transitiva: `validator@13.15.15`
- Advisory: URL validation bypass in `validator.isURL`

## Mitigação aplicada (atual)

- Foi aplicada uma mitigação runtime em `src/app.ts` que sobrescreve `validator.isURL` com opções mais restritivas (por exemplo `require_protocol: true`) para reduzir o risco de bypass.
- A mitigação é reversível e foi validada localmente (todos os testes passaram).

## Risco e impacto

- Severidade: moderate
- Impacto: depende se o projeto usa `isURL` / `IsUrl` (validação de URLs). Se não houver uso, risco prático é reduzido.

## Passos recomendados

1. Verificar se o código do projeto usa validações de URL (procure `IsUrl`, `isURL`, `IsUrl()` etc.).
2. Adicionar Dependabot / Renovate para monitorar novas versões de `class-validator` e `validator`.
3. Quando houver release do `class-validator` que dependa de uma versão não vulnerável do `validator`, atualizar e remover a mitigação runtime.
4. (Opcional, arriscado) Forçar `validator` para versão corrigida via `overrides` no `package.json` e executar testes completos no CI antes de aceitar.

## Tarefa sugerida

- [ ] Confirmar impacto (buscar usos de `IsUrl` / `isURL`)
- [ ] Adicionar Dependabot config
- [ ] Aguardar/implementar versão segura do upstream e remover mitigação

## Referências

- Advisory: https://github.com/advisories/GHSA-9965-vmph-33xx

## Notas

Se quiser, eu posso abrir uma PR com este arquivo e/ou aplicar `overrides` experimentalmente em branch separada e rodar testes/CI.
