const Pool = require('pg').Pool
const pool = new Pool({
  user: 'juliano',
  host: 'localhost',
  database: 'vendas',
  password: 'baguvix',
  port: 5432,
})
const createCliente = (req, res) => {
   const { nome } = req.body
   const cpf = req.body.cpf.substring(0,11);
   pool.query('INSERT INTO cliente (nome, cpf) VALUES ($1, $2)', [nome, cpf], (error, results) => {
     if (error) {
       throw error
     }
     res.status(201).send(`Cliente added: ${nome,cpf} `)
   })
 }

 const createCategoria = (req, res) => {
  const { descricao } = req.body
  
  pool.query('INSERT INTO categoria_produto (descricao) VALUES ($1)', [descricao], (error, results) => {
    if (error) {
      throw error
    }
    res.status(201).send(`Item cadastrado: ${descricao} `)
  })
}

const createUser = (req, res) => {
  const { nome,email,senha } = req.body
  
  pool.query('INSERT INTO usuario (nome,email,senha) VALUES ($1,$2,$3)', [nome,email,senha], (error, results) => {
    if (error) {
      throw error
    }
    res.status(201).send(`Item cadastrado: ${nome} `)
  })
}

const formaPagamento = (req, res) => {
  const { descricao } = req.body
  
  pool.query('INSERT INTO forma_pagamento (descricao) VALUES ($1 )', [descricao], (error, results) => {
    if (error) {
      throw error
    }
    res.status(201).send(`Item cadastrado: ${descricao} `)
  })
}


module.exports = {createCliente,createCategoria,createUser,formaPagamento}

