const conexao = require('../database/conexao');

module.exports = {
    async create(request,response){

        const { id } = request.body;

        const ong = await conexao('ongs')
         .where('id',id)
         .select('nome')
         .first();
         if(!ong){
             return response.status(400).json({
                 error: 'Não existe ong com este ID.'
             });
         }
         return response.json(ong);

    }
};