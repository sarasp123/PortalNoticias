var NoticiasDAO=require('../models/NoticiasDAO');

module.exports.index=function(app, req, res){
	var connection=app.config.dbconnection();//cria conecção
	var noticiasModel = new NoticiasDAO(connection);//cria uma instancia

	noticiasModel.get5UltimasNoticias(connection, function(error, result){//cria um método
		res.render('home/home.ejs', {noticias:result});//retorna para a view um JSON com as 5 últimas notícias
	});
}