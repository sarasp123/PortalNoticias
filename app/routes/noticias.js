module.exports=function(app){

	app.get('/noticias', function(req, res){//quando o usuário solicitar essa rota a função será executada
		app.app.controllers.noticias.noticias(app, req, res);//é a função responsável por renderizar
});

	app.get('/noticia', function(req, res){//quando o usuário solicitar essa rota a função será executada
		app.app.controllers.noticias.noticia(app, req, res);//é a função responsável por renderizar
		
	})
	app.get('/excluir', function(req,res){//quando o usuário solicitar essa rota a função será executada
		app.app.controllers.noticias.excluir(app,req,res);//é a função responsável por renderizar
	});
	app.get('/editar', function(req,res){//quando o usuário solicitar essa rota a função será executada
		app.app.controllers.noticias.editar(app,req,res);//é a função responsável por renderizar
	});
};
