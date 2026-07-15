# Alô Finanças

App PWA estático para controle doméstico de finanças, tarefas e lista de feira.

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
6. No app, abra Ajustes e informe a URL, a chave de instalação e a senha numérica do administrador.
7. Depois de conectado, use a seção Usuarios para cadastrar as outras pessoas e suas senhas.

Cada usuario sincronizado tem login e senha proprios no Apps Script, armazenados como hash com salt. O ultimo login fica lembrado somente no aparelho; a senha nunca e salva. O token de sessao fica no `sessionStorage` e e apagado ao sair.
