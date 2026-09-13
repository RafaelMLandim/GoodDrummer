# GodDrummer 🥁

Plataforma gamificada de gestão de alunos de bateria — uso exclusivo do professor durante as aulas. Mostra o que ensinar, metas de BPM e o progresso de cada aluno em um visual cartoonesco.

## Stack

- **Next.js** (App Router) + **TypeScript** estrito — frontend e API (Server Actions) no mesmo projeto.
- **Prisma** + **PostgreSQL** — banco tipado.
- **Tailwind CSS** — UI gamificada (cards 3D, cores por nível, barras de XP).

## Rodando localmente

```bash
npm install
npm run dev
```

Abra http://localhost:3000.

O arquivo `.env` já contém uma `DATABASE_URL` de um banco Postgres gratuito criado via `create-db` (Prisma Postgres). **Esse banco é temporário e será apagado se não for reivindicado** — veja a seção abaixo.

### Reivindicar o banco de dados gratuito

Ao rodar `npx create-db`, foi impresso um link de "Claim Your Database". Se você não guardou esse link, crie um banco definitivo com uma das opções abaixo antes de fazer o deploy (o banco temporário expira em ~24h).

### Recriando o currículo

O currículo (níveis, módulos e exercícios) fica salvo no banco e é populado pelo script de seed:

```bash
npm run db:seed
```

Rodar de novo é seguro — ele substitui módulos/exercícios pelo conteúdo de `prisma/seed.ts`, mas **apaga o progresso dos alunos nesses exercícios** (cascade). Alunos em si não são apagados.

## Deploy no Vercel

1. **Banco de dados**: crie um Postgres gerenciado (qualquer um funciona com Prisma):
   - [Vercel Postgres / Neon](https://vercel.com/marketplace/neon) (via aba Storage do projeto na Vercel)
   - [Prisma Postgres](https://www.prisma.io/postgres)
   - [Supabase](https://supabase.com)
2. No painel do Vercel, importe este projeto (via GitHub) ou rode `vercel` na raiz do projeto (CLI, sem precisar de GitHub).
3. Configure a variável de ambiente `DATABASE_URL` no projeto Vercel com a connection string do banco escolhido.
4. Deploy. O comando de build (`prisma generate && prisma migrate deploy && next build`) já aplica as migrações automaticamente a cada deploy.
5. Depois do primeiro deploy, rode o seed **uma vez** apontando para o banco de produção:
   ```bash
   DATABASE_URL="<connection-string-de-producao>" npm run db:seed
   ```

## Estrutura

- `prisma/schema.prisma` — modelos (Level, Module, Exercise, Student, StudentProgress, BpmRecord).
- `prisma/seed.ts` — currículo completo (4 níveis, do Iniciante ao GodDrummer).
- `src/lib/data.ts` — queries e cálculo de XP/progresso.
- `src/app/actions.ts` — Server Actions (criar aluno, remover aluno, atualizar progresso).
- `src/components/` — UI (dashboard, skill tree, modais de exercício).
