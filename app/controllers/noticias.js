var noticiasDAO = require('../models/noticiasDAO');

module.exports.noticias=function(app, req, res){

		var connection= app.config.dbconnection(); //chama o app que esta com o consign, depois disso ele vai para a raiz do projeto(portal_noticias) e vai para a pasta config e chama o aquivo dbconnection e já executa ele

		var noticiasModel = new noticiasDAO(connection);

	noticiasModel.getNoticias(connection, function(error, result){//cria um método
	res.render("noticias/noticias.ejs", {noticias : result})//retorna para a view as noticias
	});
};

module.exports.noticia=function(app, req, res){

	var connection= app.config.dbconnection(); //chama o app que esta com o consign, depois disso ele vai para a raiz do projeto(portal_noticias) e vai para a pasta config e chama o aquivo dbconnection e já executa ele
	var noticiasModel= new noticiasDAO(connection);//cria uma instancia 

	if(req.query.id_noticia){//verifica se o parâmetro id_noticia está na query
	var id_noticia = req.query; //id_noticia recebe o parâmetro enviado pelas views, que contém o id da noticia a ser exibida
	}else{
		res.redirect('/noticias');//o usuário será redirecionado para noticias
		return;
	}

	noticiasModel.getNoticia(connection,id_noticia, function(error, result){//cria um método
		res.render('noticias/noticia.ejs', {noticia:result});//retorna para a view a noticia
		
	})
};

module.exports.excluir=function(app,req,res){
	var pesquisa=req.body.pesquisa;//atribui o valor do campo pesquisa que foi enviado no body
	var connection=app.config.dbconnection();//chama o app que esta com o consign, depois disso ele vai para a raiz do projeto(portal_noticias) e vai para a pasta config e chama o aquivo dbconnection e já executa ele
	var noticiasModel= new noticiasDAO(connection);//cria uma instancia
	if(req.query.id_noticia){//verifica se o parâmetro id_noticia está na query
		var id_noticia=req.query;//id_noticia recebe o parâmetro enviado pelas views, que contém o id da noticia a ser exibida
	}else{
		res.redirect('/noticias');//o usuário será redirecionado para noticias
	}
	noticiasModel.excluiNoticia(connection, id_noticia, function(error, result){//cria um método
		res.redirect('/noticias');//o usuário será redirecionado para noticias
	});
}

module.exports.editar=function(app,req,res){
	var connection=app.config.dbconnection();//chama o app que esta com o consign, depois disso ele vai para a raiz do projeto(portal_noticias) e vai para a pasta config e chama o aquivo dbconnection e já executa ele
	var noticiasModel= new noticiasDAO(connection);//cria uma instancia
	if(req.query.id_noticia){//verifica se o parâmetro id_noticia está na query
		var id_noticia=req.query;//id_noticia recebe o parâmetro enviado pelas views, que contém o id da noticia a ser exibida
	}else{
		res.redirect('/noticias');//o usuário será redirecionado para noticias
	}
	noticiasModel.getNoticia(connection, id_noticia, function(error, result){//cria um método
		res.render('admin/form_update_noticia', {validacao:{}, noticia:result});//retorna para a view a a tela de atualizar a noticia
	});
}