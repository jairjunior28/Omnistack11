const conexao = require('../database/conexao');
const crypto = require('crypto');

module.exports ={
   
    async index(request,response)  {
        const ongs = await conexao('ongs').select('*');
    
        return response.json(ongs);
    },

    async create(request,response){
        //desestruturação para garantir que usuário não irá mandar dados que não queremos 
    const {nome,email,whatsapp,cidade,uf}=request.body;
    const id = crypto.randomBytes(4).toString('HEX');
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