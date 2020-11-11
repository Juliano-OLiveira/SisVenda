var pg = require('pg');

function conectar_pg(sql,res,req){
 
const conf = {
  user: 'juliano',
  database: 'vendas',
  password: 'baguvix',
  port: 5432 

}
const pool = new pg.Pool(conf);
pool.connect(function (err, client, done) {
  if (err) {
      console.log("Can not connect to the DB" + err);
  }
  client.query(sql, function (err, result) {
       done();
       if (err) {
           console.log('Erro ao Conectar BD',err);
           res.status(400).send(err);
       }
       res.status(200).send(result.rows);
       pool.end();
  })
 
})

}

 

    
module.exports=conectar_pg