# Bem vindo ao Blogs API project!
Esse projeto é uma API RESTfull na qual simula um site de Blog, nele é possivel criar, visualizar, deletar e atualizar posts. Desenvolvido na [Trybe](https://www.betrybe.com/) com uso de JavaScript, Node Js, Sequelize e Express.


# Sumário
- [Bem vindo ao Blogs API project!](#bem-vindo-ao-blogs-api-project)
- [Sumário](#sumário)
- [Contexto](#contexto)
- [Tecnologias, bibliotecas e arquiteturas usadas](#tecnologias-bibliotecas-e-arquiteturas-usadas)
- [Instruções da aplicação](#instruções-da-aplicação)


# Contexto
 Esse projeto é um CRUD (create,read,update,delete) __Blogs API__ que se conecta a um banco de dados MySQL para criar posts e usuários de um Blog.  Para isso é utilizado de diversas ferramentas e implementado a arquitetura __MSC__ (model-service-controller).

# Tecnologias, bibliotecas e arquiteturas usadas
  * __Node.js, Express, Nodemon, Joi__ | [Criação de protocolo HTTP API](http://expressjs.com/), [Roteador de API](https://expressjs.com/en/guide/routing.html), [improve API development](https://www.npmjs.com/package/nodemon), [validação de data](https://joi.dev/api/?v=17.6.0).
  * __Sequelize__ | [Mapeamento de objetos](https://sequelize.org/)
  * __Jwt__ | [Autenticação e criação de tokens](https://jwt.io/)
  * __MySQL__ | [Criação e gerenciamento de dados](https://www.mysqltutorial.org/).
  * __MSC__ | [Arquiterura model, service, controller](https://martinfowler.com/architecture/).
  * __REST__ | [Arquitetura Rest](https://restfulapi.net/).

# Instruções da aplicação
### Instalar dependências
```
cd blogs-API
npm install
```
### Rodar aplicação sem Docker

Crie um arquivo `.env` com sua conexão ao MySQL.


```
cd blogs-API
npm run debug
```

### Rodando aplicação com Docker (arquivo docker-compose foi criado pela Trybe)
```
cd blogs-API
docker-compose up -d
docker exec -it blogs_api bash
npm install
npm run prestart
npm run seed
npm run debug
```

### Rodar Lint
```
npm run lint
```
