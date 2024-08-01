const { Sequelize } = require('sequelize')
const sequelize = new Sequelize('rel_1_n','root','senai',{
    host: 'localhost',
    dialect: 'mysql'
})

sequelize.authenticate().then(()=>{
    console.log('Conexão com o banco realizada!')
}).catch((err)=>{
    console.error('Erro ao se conectar com o banco')
})

module.exports = sequelize