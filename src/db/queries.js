const { render } = require('nunjucks');


const Pool = require('pg').Pool
const pool = new Pool({
  user: 'juliano',
  host: 'localhost',
  database: 'vendas',
  password: 'baguvix',
  port: 5432,
})

// rotas para cliente

 //-----listar cliente
 const getCliente = (req, res) => {
  pool.query('select * from cliente',(err,result)=>{
    if(err){
      console.log(`Houve um erro ${err}`);
    }
    res.render(`cliente/listar`,{clientes:result.rows})
})

}


//------insert cliente-------
const createCliente = (req, res) => {
   const { nome } = req.body
   const cpf = req.body.cpf.substring(0,11);
   const sql = {
     text:'INSERT INTO cliente (nome, cpf) VALUES ($1, $2)',
     values:[nome,cpf]
   }
   pool.query(sql,(error, results) => {
     if (error) {
       throw error
     }
     req.session.message={
      type: 'success',
      intro:'Cliente: ',
      message:'Cadastrado com sussesso!!!'
    }
    res.redirect(`/cliente/listar`)
   })
 }

//-----Deletar Cliente
const deleCliente = (req, res) => {
  const id = (req.params.id)
  const sql ={
    text:'DELETE FROM cliente WHERE id = $1',
    values:[id]
  }
  console.log(id);
  pool.query( sql, (error, results) => {
    if (error) {
      throw error
    }
    //res.status(200).send(`User deleted with ID: ${id}`)
    req.session.message={
      type: 'success',
      intro:'Cliente: ',
      message:'Deletado com sussesso!!!'
    }
     res.redirect(`/cliente/listar`) 
   
  })
}




 //-------Rotas Categoria-----//
 //--------insert categoria
 const createCategoria = (req, res) => {
const  {descricao}  = req.body
  const sql = {
    text:'INSERT INTO categoria_produto (descricao) VALUES ($1)',
    values:[descricao]
  }
  pool.query(sql, (error, results) => {
    if (error) {
    
      throw error
    }
  
    req.session.message={
      type: 'success',
      intro:'Categoria: ',
      message:'Cadastrado com sussesso!!!'
    }
    res.redirect(`/categoria-produto/listar`)
  
  })
}


//-------Lista Categoria
const getCategoria = (req, res) => {
  pool.query('select * from categoria_produto',(err,result)=>{
    if(err){
      console.log(`Houve um erro ${err}`);
    }
    res.render(`categoria-produto/listar`,{categorias:result.rows})
})

}



//-----Deletar Categoria
const deleCategoria = (req, res) => {
  const id = (req.params.id)
  const sql ={
    text:'DELETE FROM categoria_produto WHERE id = $1',
    values:[id]
  }
  console.log(id);
  pool.query( sql, (error, results) => {
    if (error) {
      throw error
    }
    //res.status(200).send(`User deleted with ID: ${id}`)
    req.session.message={
      type: 'success',
      intro:'Categoria: ',
      message:'Deletada com sussesso!!!'
    }
     res.redirect(`/categoria-produto/listar`) 
   
  })
}


//insert usuario
const createUser = (req, res) => {
  const { nome,email,senha } = req.body
  const sql= {
    text:'INSERT INTO usuario (nome,email,senha) VALUES ($1,$2,$3)',
    values:[nome,email,senha] 
  }
  pool.query(sql , (error, results) => {
    if (error) {
      throw error
    }
    
    res.status(201).send(`Item cadastrado: ${nome} `)
  })
}

//-----Insert Forma
const formaPagamento = (req, res) => {
  const { descricao } = req.body
  const sql = {
    text:'INSERT INTO forma_pagamento (descricao) VALUES ($1 )',
    values:[descricao]
  }
  pool.query(sql , (error, results) => {
    if (error) {
      throw error
    }
    res.redirect('/forma/listar')
  })
}

//-----Deletar Forma
const deleForma = (req, res) => {
  const id = (req.params.id)
   
  const sql ={
    text:'DELETE FROM forma_pagamento WHERE id = $1',
    values:[id]
  }
  console.log(id);
  pool.query( sql, (error, results) => {
    if (error) {
      throw error
    }
    //res.status(200).send(`User deleted with ID: ${id}`)
    req.session.message={
      type: 'success',
      intro:'Item: ',
      message:'Deletada com sussesso!!!'
    }
     res.redirect(`/forma/listar`) 
   
  })
}


 //------------------rotas listar forma----------------//
//-------Lista Categoria
const getForma = (req, res) => {
  pool.query('select * from forma_pagamento',(err,result)=>{
    if(err){
      console.log(`Houve um erro ${err}`);
    }
    res.render(`forma/listar`,{formas:result.rows})
})


 
}

module.exports = {
  createCliente,
  createCategoria,
  createUser,
  formaPagamento,
  getCategoria,
  deleCategoria,
  getCliente,
  deleCliente,
  getForma,
  deleForma
}

