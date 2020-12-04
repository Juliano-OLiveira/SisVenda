const {Pool} = require('pg')

 

const db = new Pool({
    host:'localhost',
    user:'juliano',
    password:'baguvix',
    port:5432,
    database:'sistema_venda'
})
db.connect()
//teste
// db.query('select * from cliente',(err,result)=>{
//     if(err){
//       console.log(`Houve erro ao conectar: ${err}`);
//     }
//     console.table(result.rows)
//   })
module.exports=db