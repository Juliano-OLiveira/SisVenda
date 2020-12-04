const db =require('../db/connection')
class ClienteController{
    //listar
    index(req,res){
        db.query('select * from cliente',(err,result)=>{
            if(err){
              console.log(`Houve um erro ${err}`);
            }
            res.render(`cliente/listar`,{clientes:result.rows})
        })
    }
    //carregar a view
    create(req,res){
        res.render('cliente/adicionar')
    }

    //salvar
    store(req,res){
        const { nome } = req.body
        const cpf = req.body.cpf.substring(0,11);
        const sql = {
            text:'INSERT INTO cliente (nome, cpf) VALUES ($1, $2)',
            values:[nome,cpf]
        }
        db.query(sql,(error, results) => {
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
    //deletar
    deletar(req,res){
        const id = (req.params.id)
        const sql ={
            text:'DELETE FROM cliente WHERE id = $1',
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
            intro:'Cliente: ',
            message:'Deletado com sussesso!!!'
            }
           
   
  })
  res.redirect(`/cliente/listar`) 
    }

     //redirecionar a pagina editar
     edit(req,res){
        
        const sql = {
            text:'select * from cliente where id=$1',
            values:[req.params.id]
        }
        db.query(sql,(err,result)=>{
            if(err){
                console.log(`houve um erro${err}`);
            }
            res.render('cliente/editar',{cliente:result.rows[0]})
        })
    }

    //atualizar
    update(req,res){
        const dados = req.body
        const sql = {
            text:'update cliente set nome=$1,cpf=$2 where id=$3',
            values:[dados.nome,dados.cpf,dados.id]
        }
        db.query(sql,(err,result)=>{
            if(err){
                console.log(`Erro ao atualizar registro ${err}`);
            } 
                res.redirect('/cliente/listar')
            

        }) 
    }
}

module.exports = new ClienteController
