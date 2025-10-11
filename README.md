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
PORT=

CORS_ORIGIN=

POSTGRES_DB=
POSTGRES_USER=
POSTGRES_PASSWORD=
POSTGRES_HOST=
POSTGRES_PORT=

JWT_SECRET=
# Tempo de expiração em segundos
JWT_EXPIRES_IN=

ADMIN_USERNAME=
ADMIN_EMAIL=
ADMIN_PASSWORD=
```

lembre-se de atribuir valores válidos em cada campo.

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
