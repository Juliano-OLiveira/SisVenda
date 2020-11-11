const express = require('express')
const nunjucks = require('nunjucks')

const bodyParse = require('body-parser');
const conectar_venda = require('./src/db/queries');

const app = express()

//configurando o body parser para pegar POSTS mais tarde
app.use(bodyParse.urlencoded({extended: true})); 
app.use(bodyParse.json());

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



//  GET request is made to the homepage
app.get('/', function (req, res) {
  
  res.render('index')

})

//--------------------Rotas Views------------------------------
//listar produto
app.get('/categoria-produto/listar', (req, res) => {
  let {categoriasDeProdutos} = require('./src/db/fakeData')
  res.render('categoria-produto/listar',{categorias:categoriasDeProdutos})

})

//adicionar produto
app.get('/categoria-produto/adicionar', function (req, res) {
  
  res.render('categoria-produto/adicionar' )

})

//listar cliente
app.get('/cliente/listar', (req,res)=>{
  let {clientes} = require('./src/db/fakeData')
  res.render('cliente/listar',{clientes:clientes})

})

//adicionar cliente
app.get('/cliente/adicionar', function (req, res) {
  
  res.render('cliente/adicionar' )

})








































//-----------------------Postgres--------------------------------//
 
//cadastrar cliente
app.post('/cliente', conectar_venda.createCliente)

//cadastrar produto
app.post('/categoria-produto',conectar_venda.createCategoria)

//cadastrar usuario
app.post('/usuario',conectar_venda.createUser)

//forma de pagamento
app.post('/forma-pagamento',conectar_venda.formaPagamento)

app.listen(port, () =>{
    console.log(` esta rodando ${3000}`)
})
     
 