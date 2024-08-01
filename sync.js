const { Fabricante, Produto } = require('./model/associacao')
const conn = require('./db/conn')

async function syncDataBase(){
    try{
        await conn.sync({force:true})
        console.log('Tabelas criadas e banco sincronizado')
    }catch(err){
        console.log('Erro de sincronização')
    }finally{
        conn.close()
        console.log('Conexão do banco de dados fechada!')
    }
}

syncDataBase()