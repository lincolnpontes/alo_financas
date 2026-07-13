# Alo Finanças

App PWA estático para controle doméstico de finanças e lista de feira.

## Rodar local

Abra a pasta em um servidor local e acesse `index.html`. Exemplo:

```powershell
python -m http.server 8787
```

Depois abra `http://localhost:8787`.

## Arquivos principais

- `index.html`: estrutura das telas.
- `style.css`: visual responsivo.
- `app.js`: dados, calculos, seguranca, backup e sincronizacao.
- `manifest.json`: instalação PWA.
- `service-worker.js`: cache offline.
- `google-apps-script-sync.gs`: backend opcional para sincronizar os aparelhos.

## Sincronização

1. Crie um projeto no Google Apps Script.
2. Cole o conteudo de `google-apps-script-sync.gs`.
3. Troque a constante `INSTALLATION_KEY`.
4. Implante como app da Web, executando como voce e com acesso para qualquer pessoa com o link.
5. Copie a URL terminada em `/exec`.
6. No app, abra Ajustes e informe a URL, a chave de instalação e os PINs.

O PIN local fica apenas no navegador como hash com salt. O PIN do sync fica no Apps Script tambem como hash com salt, e o token de sessao fica no `sessionStorage`.
