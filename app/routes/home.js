module.exports=function(app){ //mandando o modulo (que é uma function) 

app.get('/', function(req,res){ //está chamando o que está dentro dos parenteses, a barra é o valor da url, está function que como parametro req (requisição) e res (resposta)
		app.app.controllers.home.index(app, req, res);//é a função responsável por renderizar
});

}