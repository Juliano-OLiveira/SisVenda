const db =require('../db/connection')
class CategoriaController{
    index(req,res){
        db.query('select * from categoria_produto',(err,result)=>{
            if(err){
              console.log(`Houve um erro ${err}`);
            }
            res.render(`categoria-produto/listar`,{categorias:result.rows})
        })
    }

    //redireciona o adicionar
    create(req,res){
        res.render('categoria-produto/adicionar' )
    }

    store(req,res){
        const  {descricao}  = req.body
  const sql = {
    text:'INSERT INTO categoria_produto (descricao) VALUES ($1)',
    values:[descricao]
  }
  db.query(sql, (error, results) => {
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

    deletar(req,res){
        const id = (req.params.id)
        const sql ={
          text:'DELETE FROM categoria_produto WHERE id = $1',
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
            intro:'Categoria: ',
            message:'Deletada com sussesso!!!'
          }
          
         
        })
        res.redirect(`/categoria-produto/listar`) 
    }
    edit(req,res){
        const id = req.params.id
         
        const sql = {
            text:'select * from categoria_produto where id=$1',
            values:[id]
        }
        db.query(sql,(err,result)=>{
            if(err){
                console.log(`houve um erro${err}`);
            }
            res.render('categoria-produto/editar',{categoria:result.rows[0]})
        })
    }

    update(req,res){
        const dados = req.body
        
        const sql = {
            text:'update categoria_produto set descricao=$1 where id=$2',
            values:[dados.descricao,dados.id]
        }
        db.query(sql,(err,result)=>{
            if(err){
                console.log(`Erro ao atualizar registro ${err}`);
            } 
                res.redirect('/categoria-produto/listar')
            

        }) 
    }
}

module.exports = new CategoriaController
 