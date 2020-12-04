const express = require('express')
const nunjucks = require('nunjucks')
const session = require('express-session'); 

 
const conectar_venda = require('./src/db/queries');
const ClienteController = require('./src/controller/ClienteController');
const CategoriaController = require('./src/controller/CategoriaController');
const FormaPagamentoController = require('./src/controller/FormaPagamentoController');
const UsuarioController = require('./src/controller/UsuarioController');
 
 

const app = express()
 

//configurando  para pegar POSTS mais tarde
app.use(express.urlencoded({extended:true}));

const port = 3000
 




//para setar a pasta dirente do default
// app.set('views','./telas')

//utilizar arquivos
app.use(express.static('public'));

//para renderizar pagina html
app.set('view engine','.html')

nunjucks.configure('./src/views', {
    autoescape: true,
    express: app
});

//menssagens
app.use(session({ 
  secret:'geeksforgeeks', 
  saveUninitialized: true, 
  resave: true
})); 
app.use((req,res, next)=>{
  res.locals.message = req.session.message
  delete req.session.message
  next()
}); 

//  GET request is made to the homepage
app.get('/', function (req, res) {
  
  res.render('index')

})


//------------------Rotas de Categoria--------------//
//listando
app.get('/categoria-produto/listar',CategoriaController.index)

//adicionar produto
app.get('/categoria-produto/adicionar',CategoriaController.create)

//cadastrar produto
app.post('/categoria-produto',CategoriaController.store)

//view edit
app.get('/categoria-produto/editar/:id',CategoriaController.edit)

//atualizar
app.post('/categoria-produto/atualizar',CategoriaController.update)

//----------------------Rotas Cliente---------------------------------//
//listar cliente
app.get('/cliente/listar',ClienteController.index)

//adicionar cliente
app.get('/cliente/adicionar',ClienteController.create)

//cadastrar cliente
app.post('/cliente/salvar', ClienteController.store)

//DELTEAR cliente
app.get('/deletar-cliente/:id',ClienteController.deletar)

//viw editar cliente
app.get('/cliente/editar/:id',ClienteController.edit)

//atualizar
app.post('/cliente/atualizar',ClienteController.update)

//----------------------Rota View Pagamento---------------------------------//
//listar
app.get('/forma/listar',FormaPagamentoController.index)

//adicionar forma
app.get('/forma/adicionar',FormaPagamentoController.create)

//cadastrar forma de pagamento
app.post('/forma/salve',FormaPagamentoController.store)

//deletar
app.get('/deletar-forma/:id',FormaPagamentoController.delete)

//editar
app.get('/forma/editar/:id',FormaPagamentoController.edit)

//atualizar
app.post('/forma/atualizar',FormaPagamentoController.update)

//-----------------------Postgres--------------------------------//
 




//cadastrar usuario
app.post('/usuario/cadastrar/',UsuarioController.store)
app.get('/usuario/adicionar',UsuarioController.create)
app.get('/usuario/listar',UsuarioController.index)
app.get('/usuario/editar/:id',UsuarioController.edit)
app.post('/usuario/atualizar',UsuarioController.update)
app.get('/usuario/deletar/:id',UsuarioController.delete)





 
 //-----------------Deletar---------------//
 app.get('/deletar-categoria/:id',CategoriaController.deletar)
 
 



 app.listen(port,() =>{
  console.log(` esta rodando ${3000}`)
})
  