const db = require('../db/connection')
 class UsuarioController{
    
    //listar
    index(req,res){
        db.query('select * from usuario',(err,result)=>{
            if(err){
              console.log(`Houve um erro ${err}`);
            }
            res.render(`usuario/listar`,{usuarios:result.rows})
        })
   

    }

    create(req,res){
        res.render('usuario/adicionar')
    }

    store(req,res){

        const { nome,email} = req.body
        const senha = req.body.senha.substring(0,150);
        const sql = {
            text:'INSERT INTO usuario (nome, email,senha) VALUES ($1, $2,$3)',
            values:[nome,email,senha]
        }
        db.query(sql,(error, results) => {
            if (error) {
            throw error
            }
            req.session.message={
            type: 'success',
            intro:'Usuário: ',
            message:'Cadastrado com sussesso!!!'
            }
            res.redirect(`/usuario/listar`)
   })
    }

    edit(req,res){

        const sql = {
            text:'select * from usuario where id=$1',
            values:[req.params.id]
        }
        db.query(sql,(err,result)=>{
            if(err){
                console.log(`houve um erro${err}`);
            }
            res.render('usuario/editar',{usuario:result.rows[0]})
        })
    }

    update(req,res){

        const dados = req.body
        
        const sql = {
            text:'update usuario set nome=$1,email=$2,senha=$3 where id=$4',
            values:[dados.nome,dados.email,dados.senha,dados.id]
        }
        db.query(sql,(err,result)=>{
            if(err){
                console.log(`Erro ao atualizar registro ${err}`);
            } 
                res.redirect('/usuario/listar')
            

        }) 
    }

    delete(req,res){
        const id = (req.params.id)
        const sql ={
          text:'DELETE FROM usuario WHERE id = $1',
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
 }
 module.exports = new UsuarioController