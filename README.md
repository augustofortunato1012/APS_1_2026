# AutoService

Aplicação de gerenciamento de oficina desenvolvida como projeto APS com arquitetura Node.js + TypeScript + Express. O frontend fica em `public/` e é servido estaticamente pelo Express, mantendo a identidade visual já aprovada sem depender de Vite.

## Requisitos

- Node.js 20+
- npm
- Windows: se a política de execução bloquear `npm.ps1`, use a etapa abaixo antes de iniciar o projeto

## Iniciar o projeto

```bash
npm install
npm run dev
```

> Em PowerShell do Windows, se o comando falhar por política de execução, execute:
>
> ```powershell
> Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass
> npm run dev
> ```

A aplicação inicia em `http://localhost:3000`.

## Scripts

```bash
npm run dev   # desenvolvimento
npm run build # compilação TypeScript
npm start     # execução da build gerada
```

## Estrutura

- `src/app.ts`: bootstrapping do Express
- `src/server.ts`: inicialização do servidor
- `src/config/`: configuração, mock data e armazenamento em memória
- `src/models/`: contratos de `Client` e `Vehicle`
- `src/controllers/`: regras de negócio e validação dos endpoints
- `src/routes/`: rotas REST para clientes e veículos
- `public/`: HTML, CSS e JavaScript estáticos do frontend

## Funcionalidades

- Dashboard com visão geral da oficina
- Listagem de clientes e veículos
- Pesquisa e paginação
- Criação, edição e exclusão com modais
- Detalhes do cliente com veículos vinculados
- Detalhes do veículo com proprietário
- Frontend responsivo preservando o visual atual

## Observações importantes

- Não há integração com Supabase/PostgreSQL nesta etapa.
- Os dados são mockados em memória para manter o projeto funcional e acadêmico.
- A arquitetura foi organizada para facilitar explicação no APS, sem adicionar tecnologias desnecessárias.
- O Express serve os arquivos estáticos de `public/` via `express.static()`.
