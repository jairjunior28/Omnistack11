const conexao = require('../database/conexao');


module.exports ={
    async index(request,response){
        
        const {page = 1} = request.query;
        const [count] = await conexao('incidents')
         .count()
         ;
         //console.log(count);
        const incidents = await conexao('incidents')
         .join('ongs','ongs.id','=','incidents.ong_id')
         .limit(5)
         .offset(( page - 1) * 5)
         .select(['incidents.*','ongs.nome','ongs.email','ongs.whatsapp','ongs.cidade','ongs.uf']);
        response.header('X-Total-Count',count['count(*)']);
        return response.json(incidents);

    },
    async create(request,response){
        const {titulo,descricao,valor} = request.body;
        const ong_id =request.headers.authorization;

        const [id] =await conexao('incidents').insert({
            titulo,
            descricao,
            valor,
            ong_id
        });
        return response.json({id});
    },
    async delete(request,response){
        const { id } = request.params;
        const ong_id = request.headers.authorization;
        console.log(id);
        //buscar id da ong logada para verificar se o id que esta tentando apagar pertence a ong
        const incident = await conexao('incidents')
         .where('id', id)
         .select('ong_id')
         .first();
         //caso não seja vetamos abaixo
         if(incident.ong_id !==  ong_id){
             return response.status(401).json({error: 'Operação não permitida.'});
         }
         //caso contrário deletar do banco
         await conexao('incidents').where('id', id).delete();
         //retornar resposta de sucesso vazia sem conteúdo
         return response.status(204).send();

    }

};