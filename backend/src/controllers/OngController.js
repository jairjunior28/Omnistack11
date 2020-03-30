const conexao = require('../database/conexao');

const generateUniqueId = require('../utils/generateUniqueId');

module.exports ={
   
    async index(request,response)  {
        const ongs = await conexao('ongs').select('*');
    
        return response.json(ongs);
    },

    async create(request,response){
        //desestruturação para garantir que usuário não irá mandar dados que não queremos 
    const {nome,email,whatsapp,cidade,uf}=request.body;
    const id = generateUniqueId();
    //const data= request.body;
    //console.log(data);
    await conexao('ongs').insert({
        id,
        nome,
        email,
        whatsapp,
        cidade,
        uf
    });


    return response.json({id});
    }
};