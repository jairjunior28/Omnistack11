const request = require('supertest');
const app = require('../../src/app');
const connection = require('../../src/database/conexao')
describe('ONG',()=>{
    beforeEach(async ()=>{
       await  connection.migrate.rollback();
       await  connection.migrate.latest();
    });
    afterAll(async ()=>{
       await  connection.destroy();
    });
    it('should be able to create a new ONG',async ()=>{
        const response= await request(app).post('/ongs').send({
            
                nome: "Teste1133311",
                email: "jairjr@aedu.com",
                whatsapp: "62991168220",
                cidade: "Anápolis",
                uf: "go"
            
        });
        expect(response.body).toHaveProperty('id');
        expect(response.body.id).toHaveLength(8);
        
    })
});