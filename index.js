const express = require('express')
const app = express()
const cors = require('cors')

const conn = require('./db/conn')
const Fabricante = require('./model/Fabricante')
const Produto = require('./model/Produto')

const PORT  = 3000
const hostname = 'localhost'
// ---------------------------------------
app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(cors())
// ----------------------------------------

app.post('/produto', async (req,res)=>{
    const valores = req.body
    console.log(valores)
    
    try{
        if(valores.fabricanteId == 1){
            const pesq = await Produto.create(valores, {raw: true})
            res.status(201).json(pesq)
        }else{
            res.status(404).json({message: "fabricante não existe"})
        }
    }catch(err){
        console.error('Não foi possível consultar os dados!',err)
        res.status(500).json({message: "Não foi possível consultar os dados!"})
    }
})

app.get('/fabricante', async (req,res)=>{
    const valores = req.query
    console.log(valores)

    try{
        const pesq = await Fabricante.findOne({where: { marca: valores.marca}, raw: true})
        if(pesq === null){
            console.log('valores inexistentes!')
            res.status(404).json({message: "valores inexistentes!"})
        }else if(pesq.marca == valores.marca){
            console.log(pesq.marca)
            res.status(200).json(pesq.marca)
        }
    }catch(err){
        console.error('Não foi possível consultar os dados!',err)
        res.status(500).json({message: "Não foi possível consultar os dados!"})
    }
    
})

app.get('/fabricantes', async (req,res)=>{
    try{
        const pesq = await Fabricante.findAll()
        res.status(200).json(pesq)
    }catch(err){
        console.error('Não foi possível listar os dados!',err)
        res.status(500).json({message: "Não foi possível listar os dados!"})
    }
})

app.post('/fabricante', async (req,res)=>{
    const valores = req.body
    console.log(valores)

    try{
        const pesq = await Fabricante.create(valores, {raw: true})
        console.log(pesq)
        res.status(201).json(pesq)
    }catch(err){
        console.error('Não foi possível gravar os dados!',err)
        res.status(500).json({message: "Não foi possível gravar os dados!"})
    }
})

app.delete('/fabricante/:id', async (req,res)=>{
    const valor = req.params
    // console.log(valor)
    const pesq = await Fabricante.findByPk(valor.id)
    try{
    if(pesq === null){
        console.log(pesq)
        res.status(404).json({message: "Fabricante inexistente"})
    }else{
        console.log(pesq)
        await Fabricante.destroy({where: {codFabricante: valor.id}})
        res.status(200).json({message: "Fabricante excluido"})
    }
}catch(err){
    console.error('Não foi possível apagar os dados!',err)
        res.status(500).json({message: "Não foi possível apagar os dados!"})
    }
})

app.put('/fabricante', async (req,res)=>{
    const valores = req.body
    console.log(valores)
    const pesq = await Fabricante.findByPk(valores.codFabricante)
    console.log(pesq)
    res.status(200).json(pesq)
})

app.get('/', (req,res)=>{
    console.log('aplicação rodando!')
    res.status(200).json({message: 'aplicação rodando!'})
})
// ----------------------------------------
conn.sync().then(()=>{
    app.listen(PORT, hostname, ()=>{
        console.log(`O servidor está rodando em ${hostname}:${PORT}`)
})
}).catch((err)=>{
    console.error('Banco de dados não conectado!',err)
})