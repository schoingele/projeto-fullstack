# SECURITY ADVISORY — validator / class-validator

Resumo
------
Durante a instalação/checagem (`npm install` / `npm audit`) foram detectadas 2 vulnerabilidades de severidade "moderate":

- `validator` (transitiva) — advisory GHSA-9965-vmph-33xx: "validator.js has a URL validation bypass vulnerability in its isURL function". Afeta `validator@<=13.15.15`.
- `class-validator` (direta) — depende de `validator` e por isso é reportada como efeito.

Motivo
------
O projeto usa `class-validator@0.14.2` que depende de `validator@^13.9.0`. A versão instalada transitiva foi `validator@13.15.15`, que está dentro da faixa afetada.

Mitigação aplicada
-------------------
Uma mitigação temporária e reversível foi aplicada no bootstrap da aplicação (`src/app.ts`): um patch runtime substitui `validator.isURL` por uma versão mais restritiva que força opções seguras (por exemplo `require_protocol: true`) e falha com `false` em caso de erro. Essa abordagem evita tocar em dependências e é facilmente revertida.

O patch está localizado em:

```
src/app.ts
// trecho que aplica o patch runtime para validator.isURL
```

Testes
------
Após a aplicação do patch, a suíte de testes (`npm run test:ci`) foi executada localmente e passou sem regressões.

Próximos passos recomendados
---------------------------
1. Monitorar releases do `class-validator` e do `validator`. Quando houver uma versão do `class-validator` que dependa de uma versão corrigida do `validator`, atualizar e remover a mitigação.
2. Adicionar Dependabot/Renovate para abrir PRs automáticas quando houver atualizações seguras.
3. (Opcional) Avaliar uso de `overrides` no `package.json` para forçar uma versão do `validator` se e somente se testes completos aprovarem — isso é arriscado e deve ter acompanhamento em CI.
4. Documentar a mitigação (este arquivo) e criar um ticket interno para acompanhar até que o upstream resolva o problema.

Como reverter o patch runtime
-----------------------------
1. Remover o bloco de código que sobrescreve `validator.isURL` em `src/app.ts`.
2. Rodar `npm ci` / `npm install` se você alterar dependências.
3. Executar a suíte de testes e `npm audit` para validar o estado.

Comandos úteis
-------------
- Rodar testes (modo CI):
  ```bash
  npm run test:ci
  ```
- Rodar auditoria (JSON):
  ```bash
  npm audit --json
  ```
- Para tentar atualizações automáticas (pode não resolver completamente):
  ```bash
  npm audit fix
  ```

Contato / notas
---------------
Se você preferir que eu tente aplicar um `overrides` e rodar CI/testes para avaliar segurança, eu posso fazer isso (opção com risco). Caso contrário, recomendo aguardar atualização upstream e manter a mitigação enquanto o patch não estiver disponível.
