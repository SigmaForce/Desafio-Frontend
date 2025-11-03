# Cubos Movies

Uma aplicação web moderna para explorar e gerenciar filmes, construída com React, TypeScript e Vite.

## 🚀 Como Executar o Projeto

### Pré-requisitos

Antes de começar, você precisa ter instalado em sua máquina:

- [Node.js](https://nodejs.org/) (versão 18 ou superior)
- [pnpm](https://pnpm.io/) (gerenciador de pacotes)

### Instalação

1. Clone o repositório

```bash
git clone https://github.com/SigmaForce/cubos-movies.git
cd cubos-movies
```

2. Instale as dependências

```bash
pnpm install
```

### Executando a Aplicação

- Para iniciar o servidor de desenvolvimento:

```bash
pnpm dev
```

A aplicação estará disponível em `http://localhost:5173`

- Para criar uma build de produção:

```bash
pnpm build
```

- Para visualizar a build de produção localmente:

```bash
pnpm preview
```

### Scripts Disponíveis

- `pnpm dev` - Inicia o servidor de desenvolvimento
- `pnpm build` - Cria uma build otimizada para produção
- `pnpm preview` - Executa a build de produção localmente
- `pnpm lint` - Executa a verificação de linting no código

## 🛠 Tecnologias

O projeto utiliza as seguintes tecnologias:

- React 19
- TypeScript
- Vite
- TailwindCSS
- React Router Dom
- React Query
- React Hook Form
- Radix UI
- Zod

## 📁 Estrutura do Projeto

```
src/
├── assets/        # Recursos estáticos (ícones, imagens)
├── components/    # Componentes React reutilizáveis
├── context/       # Contextos React (AuthContext)
├── hooks/        # Custom hooks
├── lib/          # Utilitários e funções auxiliares
└── pages/        # Componentes de página
```
