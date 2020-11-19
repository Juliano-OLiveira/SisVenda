const express = require('express')
const nunjucks = require('nunjucks')
const session = require('express-session'); 

 
const conectar_venda = require('./src/db/queries');
 
 

const app = express()
 

//configurando o body parser para pegar POSTS mais tarde
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

//--------------------Rotas Views------------------------------
//listar produto
// app.get('/categoria-produto/listar', (req, res) => {
//     let {categoriasDeProdutos} = require('./src/db/fakeData')
   
  
//   res.render('categoria-produto/listar',{categorias:categoriasDeProdutos})
  
// })

//------------------Listando do Categoria--------------//
app.get('/categoria-produto/listar',conectar_venda.getCategoria)

//adicionar produto
app.get('/categoria-produto/adicionar', function (req, res) {
  
  res.render('categoria-produto/adicionar' )

})

//listar cliente
app.get('/cliente/listar', conectar_venda.getCliente)

//adicionar cliente
app.get('/cliente/adicionar', function (req, res) {
  
  res.render('cliente/adicionar' )

})

//----------------------Rota View Pagamento---------------------------------//
app.get('/forma/listar',conectar_venda.getForma)

//adicionar forma
app.get('/forma/adicionar', function (req, res) {
  
  res.render('forma/adicionar' )

})


//-----------------------Postgres--------------------------------//
 
//cadastrar cliente
app.post('/cliente/salvar', conectar_venda.createCliente)

//cadastrar produto
app.post('/categoria-produto',conectar_venda.createCategoria)

//cadastrar usuario
app.post('/usuario',conectar_venda.createUser)

//cadastrar forma de pagamento
app.post('/forma/salve',conectar_venda.formaPagamento)

 
 //-----------------Deletar---------------//
 app.get('/deletar-categoria/:id',conectar_venda.deleCategoria)
 app.get('/deletar-cliente/:id',conectar_venda.deleCliente)
 app.get('/deletar-forma/:id',conectar_venda.deleForma)



 app.listen(port,() =>{
  console.log(` esta rodando ${3000}`)
})
  