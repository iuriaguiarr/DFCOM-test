# Descrição do teste:

Desenvolva um processo de autenticação usando NodeJS + NextJS.

O processo deve ser feito baseado na autenticação com refresh token, onde, os dados de autenticação precisam ser armazenados em um banco de dados ( seja relacional ou não relacional ), e renovado em cada expiração baseado no refresh token com base nas normas da RFC-7519.

O framework de uso no nodejs precisa ser NestJS. Já no NextJS( front ), o usuário deve conseguir efetuar um login, gerar um token e fazer qualquer ação.

Devemos ter também páginas de usuário autenticado e não autenticado.

Deve ser utilizado a ferramenta git para versionamento.

## Utilização

Para a utilização do projeto, é necessário iniciar as duas aplicações, tanto o back-end, quanto o front-end, utilizando os seguintes comandos:

- Back-end

```bash
$ cd backend && npm install && npm run build && npm run start:prod
# ou
$ cd backend && yarn && yarn build && yarn start:prod
```

- Front-end

```bash
$ cd frontend && npm install && npm run build && npm run start
# ou
$ cd frontend && yarn && yarn build && yarn start
```

## Observações

Por se tratar de um projeto de testes, não fez-se necessária a utilização de boas práticas de segurança, tais como: criptogratia de senhas, criptografia de variáveis de ambiente, entre outras.

Também foi feita a utilização do framework ChakraUI para padronização da estilização do front-end, tornando a interface neutra para a avaliação da sua construção e funcionalidade.

## Tasks:

- [x] Install Next.js
- [x] Install ChakraUI
- [x] Install Icons
- [x] Install Nest.js
- [x] Install Prisma
- [x] Send first commit
- [x] Create schema
- [x] Send first migrate
- [x] Create home page
- [x] Create login page
- [x] Create profile page
- [x] Create PrismaService
- [x] Create AuthService
- [x] Create Middleware
- [x] Create Login Method
- [x] Create Logout Method
- [x] Create Get User Info Method
