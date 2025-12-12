# Projeto Netflix (Backend)

Projeto CRUD realizado no curso técnico de informática do IFPR.

# Executando

## Docker

Para executar o projeto em um docker container, simplesmente rode o seguinte comando:

```bash
docker compose up
```

## Localmente

### Configurando o ambiente

Antes de mais nada, crie um arquivo `.env` na raiz do projeto com a seguinte estrutura:

```sh
PORT=3000

CORS_ORIGIN=http://localhost:5173

POSTGRES_DB=
POSTGRES_USER=
POSTGRES_PASSWORD=
POSTGRES_HOST=
POSTGRES_PORT=

MOVIEDB_API_KEY=

JWT_SECRET=
JWT_EXPIRES_IN=86400000

ADMIN_USERNAME=admin
ADMIN_EMAIL=admin@localhost
ADMIN_PASSWORD=admin
```

lembre-se de atribuir valores válidos em cada campo que esteja faltando.

### Configurando o banco

O projeto é baseado em PostgreSQL. Certifique-se de tê-lo instalado em sua
máquina, para então executar o seguinte comando:

```bash
npm i && npm run migrator:up
```

### Executando

Finalmente, execute o seguinte comando:

```bash
npm run dev
```

e o servidor deverá inciar sem erros.
