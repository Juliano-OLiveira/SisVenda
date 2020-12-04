const express = require('express')
const nunjucks = require('nunjucks')
const session = require('express-session'); 

 
const conectar_venda = require('./src/db/queries');
const ClienteController = require('./src/controller/ClienteController');
 
 

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


//------------------Listando do Categoria--------------//
app.get('/categoria-produto/listar',conectar_venda.getCategoria)

//adicionar produto
app.get('/categoria-produto/adicionar', function (req, res) {
  
  res.render('categoria-produto/adicionar' )

})

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
app.get('/forma/listar',conectar_venda.getForma)

//adicionar forma
app.get('/forma/adicionar', function (req, res) {
  
  res.render('forma/adicionar' )

})


//-----------------------Postgres--------------------------------//
 


//cadastrar produto
app.post('/categoria-produto',conectar_venda.createCategoria)

//cadastrar usuario
app.post('/usuario',conectar_venda.createUser)

//cadastrar forma de pagamento
app.post('/forma/salve',conectar_venda.formaPagamento)

 
 //-----------------Deletar---------------//
 app.get('/deletar-categoria/:id',conectar_venda.deleCategoria)
 
 app.get('/deletar-forma/:id',conectar_venda.deleForma)



 app.listen(port,() =>{
  console.log(` esta rodando ${3000}`)
})
  