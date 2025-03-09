

## :gear: Back-end

## Pré requisitos

- Git [Git](https://git-scm.com)
- Node.js [Node.js v11.15.0](https://nodejs.org/)
- Typescript [Typescript](https://www.typescriptlang.org/)
- Yarn [Yarn v1.13](https://yarnpkg.com/)
- Docker [Docker](https://www.docker.com/)
- Docker Compose [Docker Compose](https://docs.docker.com/compose/)

## Instruções

```bash
# instalar as dependências
yarn install

# subir os serviços (postgres)
docker-compose up -d

# executar migration
npm run sequelize-ts db:migrate

# iniciar o servidor da aplicação
npm dev 
```