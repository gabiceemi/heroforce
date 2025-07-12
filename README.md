<p align="center">
  <img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" />
</p>

<h1 align="center">HeroForce</h1>

<p align="center">
  Plataforma web fullstack para gestão de projetos heroicos.
</p>

---

## 🚀 Sobre o projeto

**HeroForce** é uma aplicação **web fullstack** que simula um sistema de gestão e acompanhamento de projetos para **heróis e administradores**.

Criado como projeto autoral para estudar:

- Autenticação JWT  
- API RESTful documentada com Swagger  
- Banco de dados relacional com PostgreSQL  
- Backend escalável com NestJS  
- Frontend desacoplado com Next.js ou React  
- Testes unitários e E2E com Jest  
- Deploy em ambientes cloud  

---

## ⚙️ Tecnologias

- [NestJS](https://nestjs.com/) — Backend  
- [TypeORM](https://typeorm.io/) — ORM  
- [PostgreSQL](https://www.postgresql.org/) — Banco de dados  
- [Passport + JWT](https://docs.nestjs.com/security/authentication) — Autenticação  
- [Swagger](https://swagger.io/) — Documentação de API  
- [Jest](https://jestjs.io/) — Testes  
- [Next.js](https://nextjs.org/) ou [React](https://react.dev/) — Frontend  
- [Docker](https://www.docker.com/) — Containerização  

---

## 🗃️ Funcionalidades

✅ Cadastro de heróis com escolha de personagem (Marvel/DC/Outros)  
✅ Login seguro com JWT  
✅ CRUD de projetos com metas (agilidade, encantamento, eficiência, excelência, transparência, ambição)  
✅ Painel de acompanhamento de progresso dos projetos  
✅ Filtros por status e responsável  
✅ Painel administrativo para edição de projetos  
✅ Interface responsiva (CSS puro ou Styled Components)  

---

## 📦 Como rodar o projeto localmente

Este projeto utiliza **Docker** e **Docker Compose** para orquestrar os containers do frontend, backend e banco de dados.

---

### ✅ Pré-requisitos

- [Docker](https://www.docker.com/get-started) instalado  
- [Docker Compose](https://docs.docker.com/compose/) (já incluso no Docker Desktop)

---

### ▶️ Rodando a aplicação

No diretório raiz do projeto (onde está o arquivo `docker-compose.yml`), execute o comando abaixo:

```bash
docker compose up --build
```

---

### 🧰 O que será iniciado

- 🔧 Backend (NestJS): http://localhost:3000  
- 🖥️ Frontend (Next.js): http://localhost:3001  
- 🐘 PostgreSQL: na porta 5432, com volume persistente

---

### 📘 Documentação Swagger

A API possui uma interface interativa de documentação e testes via Swagger:

- 🧠 **Swagger (API Docs)**: [http://localhost:3000/api](http://localhost:3000/api)

Essa documentação permite:

- Visualizar todos os endpoints disponíveis;
- Testar requisições diretamente pelo navegador;
- Ver exemplos de payloads e respostas;
- Consultar detalhes de validação e parâmetros esperados.

> 🔐 **Atenção**: Endpoints protegidos exigem autenticação via token JWT no botão **"Authorize"** no topo direito da interface.

---

### ⛳ Acesso rápido

- 🧠 Swagger/API: http://localhost:3000  
- 🌐 Frontend: http://localhost:3001  
- 🐘 Banco de Dados PostgreSQL:

```text
Host: localhost
Porta: 5432
Database: heroforce
Usuário: postgres
Senha: postgres
```

> ⚠️ O `NEXT_PUBLIC_API_URL` do frontend já está configurado como `http://localhost:3000` nas variáveis de ambiente do `docker-compose.yml`.

---

### 🛑 Encerrando os containers

Para parar tudo, execute:

```bash
docker compose down
```
