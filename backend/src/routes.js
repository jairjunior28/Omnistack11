const express = require ('express');
const crypto = require('crypto');
const {celebrate, Segments, Joi} =require('celebrate');

const OngController = require ('./controllers/OngController');
const IncidentsController = require ('./controllers/IncidentsController');
const ProfileController = require ('./controllers/ProfileController');
const SessionController = require ('./controllers/SessionController');

const routes = express.Router();
//login
routes.post('/sessions',celebrate({
    [Segments.BODY]: Joi.object().keys({
        id: Joi.string().required(),
    })
}),SessionController.create);
//listagem de ongs
routes.get('/ongs', OngController.index);
//criação de ongs
routes.post('/ongs', celebrate({
    [Segments.BODY]: Joi.object().keys({
        nome: Joi.string().required(),
        email: Joi.string().required().email(),
        whatsapp: Joi.string().required().min(10).max(11),
        cidade: Joi.string().required(),
        uf: Joi.string().required().length(2),
    })
}),OngController.create);
//listagem casos
routes.get('/incidents', celebrate({
    [Segments.QUERY]: Joi.object().keys({
        page: Joi.number(),
    })
}),IncidentsController.index);
//criação casos
routes.post('/incidents', celebrate({
    [Segments.BODY]: Joi.object().keys({
        titulo: Joi.string().required(),
        descricao: Joi.string().required(),
        valor: Joi.number().required()
    })

}),celebrate({
    [Segments.HEADERS]: Joi.object({
        authorization: Joi.string().required()
    }).unknown()
}),IncidentsController.create);
//apagar casos
routes.delete('/incidents/:id', celebrate({
    [Segments.PARAMS]: Joi.object().keys({
        id: Joi.number().required(),
    })
}),IncidentsController.delete);

routes.get('/profile',celebrate({
    [Segments.HEADERS]: Joi.object({
        authorization: Joi.string().required()
    }).unknown()
}), ProfileController.index);


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
