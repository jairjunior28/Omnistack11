const express = require ('express');
const crypto = require('crypto');

const OngController = require ('./controllers/OngController');
const IncidentsController = require ('./controllers/IncidentsController');
const ProfileController = require ('./controllers/ProfileController');
const SessionController = require ('./controllers/SessionController');

const routes = express.Router();
//login
routes.post('/sessions',SessionController.create);
//listagem de ongs
routes.get('/ongs', OngController.index);
//criação de ongs
routes.post('/ongs', OngController.create);
//listagem casos
routes.get('/incidents', IncidentsController.index);
//criação casos
routes.post('/incidents', IncidentsController.create);
//apagar casos
routes.delete('/incidents/:id', IncidentsController.delete);

routes.get('/profile', ProfileController.index);


module.exports = routes;
/*
resources==recursos
Metodos HTTP:
* get: buscar/listar informação no back end
* post: criar informação no back end
* put: atualizar informação no back end
* delete: apagar informação no back end
*
* Tipos de parametro:
* Query Params: parâmetros nomeados enviados na rota após ? e & (filters,pagination)
* Route Params: parâmetros utilizados para identificar recursos.
* Request Body: Corpo da requisição utilizado para criar ou alterar uma requisição.
*
* SQL: SQLite, Mysql,Postgresql, Oracle, SQL Server
* NoSQL: MongoDB, CouchDB etc
*
* Driver: Select * from users
* Query Builder: table('users').select('*').where()
* Query Builder EX: Knex mais utilizado no node compativel com a maior parte dos SQL bank
*
*/
//* Query Params: parâmetros nomeados enviados na rota após ? e & (filters,pagination)
/*app.get('/', (request,response) => {
 
    const params= request.query;
    console.log(params);

    return response.json({
    teste:'teste',
    teste2:'teste'});

});
//* Route Params: parâmetros utilizados para identificar recursos.
/*app.get('/users/:id', (request,response) => {
 
    const params= request.params;
    console.log(params);

    return response.json({
    teste:'teste',
    teste2:'teste'});

});*/
