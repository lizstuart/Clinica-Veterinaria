# Clinica-Veterinaria

Linguagem utilizada: JavaScript.

1. Faça o fork e clone do repositório;

2. Com uso do VS Code, configure o projeto:
    - Utilize o comando: `npm init -y`
    - Instale bibliotecas: express, knex, bcrypt, cors, dotenv e pg `npm install express knex bcrypt cors pg dotenv`
    - Instale o nodemon como dependência para testes: `npm -D nomemon`
   
3. Crie a pasta `src` e os arquivos `index.js`, `rotas.js` e `conexão.js`.
    - No index.js instancie o express, utilize o JSON como método de retorno, importe as rotas e instancie e configure o dotenv para usar as varaiáveis de ambiente;
    - No rotas.js crie as rotas usando os endpoints: get, post, put e delete (de acordo com a função desejada);
    - No conexão.js instancie e exporte o knex usando client e conecte com o banco de dados PostgreSql, usando a seguinte constante:
    
     
    ```javascript
    const knex const knex = require('knex')({
    client: 'pg',
    connection: {
        host: 'o local',
        port: numero da porta,
        user: 'nome do usuario',
        password: 'senha do usuario',
        database: 'nome do banco de dados'
        
    }})
    ```
 
 4. Crie a pasta controladores e dentro dela o arquivo animais.js. Nesse artuivo devem ser criadas as funções dos endpoints: `get`, `post`, `put` e `delete`.
        - Importe o knex de conexão.js e o bcrypt para cripitografar rotas.
 
 5. Atualize o campo `scripts` do arquivo `package.json` para 'dev': 'nodemon ./src/index.js' e use o comando `npm run dev` para subir o servidor.
