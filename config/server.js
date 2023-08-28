var express= require('express'); //importar o express para a variavel express
var consign= require('consign');
var bodyParser = require('body-parser');
var expressValidator=require('express-validator');

var app=express(); //executando express na variavel app

app.set('view engine','ejs'); //configurando o motor de telas
app.set('views', './app/views'); //novo caminho para a pasta views
app.use(express.static('./app/public'))//usando aquivos estáticos (front-end) e onde estão localizados

app.use(bodyParser.urlencoded({extended:true}));
app.use(expressValidator());//executando o express validator

consign()//iniciando o consign
.include('app/routes')//especifica o diretório que precisa ser incluído
.then('config/dbconnection.js')//especifica que o arquivo precisa ser incluído
.then('app/models')//especifica que o arquivo precisa ser incluído
.then('app/controllers')//especifica que o arquivo precisa ser incluído
.into(app);//indica que os arquivos carregados precisam ser adicionado ao app

module.exports=app; //mandando o modulo (que é uma variavel)