# Projeto Netflix (Backend)

Projeto CRUD realizado no curso técnico de informática do IFPR.

# Executando

## Docker

Para executar o projeto em um docker container, simplesmente rode o seguinte comando:

```
docker compose up
```

## Localmente

### Configurando o ambiente

Antes de mais nada, crie um arquivo `.env` na raiz do projeto com a seguinte estrutura:

```sh
PORT=3000

CORS_ORIGIN=http://localhost:5173

POSTGRES_DB=netflix
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
POSTGRES_HOST=localhost
POSTGRES_PORT=5432

JWT_SECRET=stinger-uncapped-negligent-dish-trimness-raft
JWT_EXPIRES_IN=3600

ADMIN_USERNAME=admin
ADMIN_EMAIL=admin@localhost
ADMIN_PASSWORD=admin
```

lembre-se de substituir os valores entre colchetes por algo válido.

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
