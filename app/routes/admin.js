module.exports=function(app){

	app.get('/formulario_inclusao_noticia', function(req,res){//quando o usuário solicitar essa rota a função será executada
		app.app.controllers.admin.formulario_inclusao_noticia(app, req, res);//é a função responsável por renderizar
	});

	app.post('/noticias/salvar', function(req, res){//quando o usuário solicitar essa rota a função será executada
		app.app.controllers.admin.noticias_Salvar(app,req,res);//é a função responsável por renderizar
	});

	app.post('/atualizar', function(req, res){//quando o usuário solicitar essa rota a função será executada
		app.app.controllers.admin.noticias_atualizar(app,req,res);//é a função responsável por renderizar
	});
}