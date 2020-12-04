const db = require('../db/connection')
class FormaPagamentoController{
    index(req,res){

  db.query('select * from forma_pagamento',(err,result)=>{
    if(err){
      console.log(`Houve um erro ${err}`);
    }
    res.render(`forma/listar`,{formas:result.rows})
})
    }

    create(req,res){
        res.render('forma/adicionar' )
    }

    store(req,res){

  const { descricao } = req.body
  const sql = {
    text:'INSERT INTO forma_pagamento (descricao) VALUES ($1 )',
    values:[descricao]
  }
  db.query(sql , (error, results) => {
    if (error) {
      throw error
    }
   
  })
  res.redirect('/forma/listar')
    }

    edit(req,res){
        const sql = {
            text:'select * from forma_pagamento where id=$1',
            values:[req.params.id]
        }
        db.query(sql,(err,result)=>{
            if(err){
                console.log(`houve um erro${err}`);
            }
            res.render('forma/editar',{forma:result.rows[0]})
        })
    }

    update(req,res){
        const dados = req.body
        
        const sql = {
            text:'update forma_pagamento set descricao=$1 where id=$2',
            values:[dados.descricao,dados.id]
        }
        db.query(sql,(err,result)=>{
            if(err){
                console.log(`Erro ao atualizar registro ${err}`);
            } 
                res.redirect('/forma/listar')
            

        }) 
    }

    delete(req,res){

  const id = (req.params.id)
   
  const sql ={
    text:'DELETE FROM forma_pagamento WHERE id = $1',
    values:[id]
  }
  console.log(id);
  db.query( sql, (error, results) => {
    if (error) {
      throw error
    }
    //res.status(200).send(`User deleted with ID: ${id}`)
    req.session.message={
      type: 'success',
      intro:'Item: ',
      message:'Deletado com sussesso!!!'
    }
    res.redirect(`/forma/listar`) 
   
  })
 
    }
}

module.exports = new FormaPagamentoController