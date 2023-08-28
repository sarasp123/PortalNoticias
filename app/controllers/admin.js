const noticiasDAO = require('../models/noticiasDAO');

module.exports.formulario_inclusao_noticia=function(app, req, res){//tem o app por causa do express; por causa também do into, o consig deixa tudo dentro do express
	res.render('admin/form_add_noticia.ejs', {validacao:{}, noticia:{}})//caminho que vai ser renderizado 
}

module.exports.noticias_Salvar=function(app, req, res){
	var noticia=req.body;

	req.assert('titulo', 'Título é obrigatória').notEmpty();//assert é um metodo do express validator que tem a função de identificar o nome do elemento que eu queira validar. Com base no nome do elemento eu consigo determinar a mensagem que eu quero mostrar ao usuário caso uma condição de validação não seja atendida, o primeiro parametro é o nome do titulo no form-add-noticia, o segundo é uma mensagem caso o usuário deixe o titulo vazio
	req.assert('resumo', 'Resumo é obrigatório').notEmpty();//assert é um metodo do express validator que tem a função de identificar o nome do elemento que eu queira validar. Com base no nome do elemento eu consigo determinar a mensagem que eu quero mostrar ao usuário caso uma condição de validação não seja atendida, o primeiro parametro é o nome do resumo no form-add-noticia, o segundo é uma mensagem caso o usuário deixe o resumo vazio
	req.assert('resumo', 'Resumo deve conter entre 10 e 100 caracteres').len(10,100);//assert é um metodo do express validator que tem a função de identificar o nome do elemento que eu queira validar. Com base no nome do elemento eu consigo determinar a mensagem que eu quero mostrar ao usuário caso uma condição de validação não seja atendida, o primeiro parametro é o nome do resumo no form-add-noticia, o segundo é uma mensagem caso o usuário não preencha da maneira correta
	req.assert('autor', 'Autor é obrigatório').notEmpty();//assert é um metodo do express validator que tem a função de identificar o nome do elemento que eu queira validar. Com base no nome do elemento eu consigo determinar a mensagem que eu quero mostrar ao usuário caso uma condição de validação não seja atendida, o primeiro parametro é o nome do autor no form-add-noticia, o segundo é uma mensagem caso o usuário deixe o autor vazio
	req.assert('noticia', 'Notícia é obrigatória').notEmpty();//assert é um metodo do express validator que tem a função de identificar o nome do elemento que eu queira validar. Com base no nome do elemento eu consigo determinar a mensagem que eu quero mostrar ao usuário caso uma condição de validação não seja atendida, o primeiro parametro é o nome da notícia no form-add-noticia, o segundo é uma mensagem caso o usuário deixe o notícia vazio

	var erros=req.validationErrors();//vai retornar verdadeiro ou falso, caso o usuário não atenda alguma restrição retornará true
	if(erros){
		res.render('admin/form_add_noticia.ejs', {validacao:erros, noticia:noticia});//irá aparecer a página do form_add_noticia mostrando os erros, e as que estão certas ficaram escritas
	}

	var connection=app.config.dbconnection();//acessando o banco de dados
	var noticiasModel=new noticiasDAO(connection);//cria um objeto
	
	noticiasModel.salvarNoticia(noticia, connection, function(error, result){//variavel que contem a noticia. conexao.
		if(error){
			console.log(error);
		}
		res.redirect('/noticias');//para redirecionar para o usuário ver o conteudo cadastrado
	})
	
}

module.exports.noticias_atualizar=function(app, req, res){
	var noticia=req.body;
	var id_noticia=req.body.id_noticia;
	console.log('$$$$ Aqui está a variavel id_noticia do controlador noticias_atualizar= '+id_noticia);

	req.assert('titulo', 'Título é obrigatório').notEmpty();//assert é um metodo do express validator que tem a função de identificar o nome do elemento que eu queira validar. Com base no nome do elemento eu consigo determinar a mensagem que eu quero mostrar ao usuário caso uma condição de validação não seja atendida, o primeiro parametro é o nome do titulo no form-update-noticia, o segundo é uma mensagem caso o usuário deixe o titulo vazio
	req.assert('noticia', 'Notícia é obrigatória').notEmpty();//assert é um metodo do express validator que tem a função de identificar o nome do elemento que eu queira validar. Com base no nome do elemento eu consigo determinar a mensagem que eu quero mostrar ao usuário caso uma condição de validação não seja atendida, o primeiro parametro é o nome da notícia no form-update-noticia, o segundo é uma mensagem caso o usuário deixe o notícia vazio
	req.assert('resumo', 'Resumo deve conter entre 10 e 100 caracteres').len(10, 100);//assert é um metodo do express validator que tem a função de identificar o nome do elemento que eu queira validar. Com base no nome do elemento eu consigo determinar a mensagem que eu quero mostrar ao usuário caso uma condição de validação não seja atendida, o primeiro parametro é o nome do resumo no form-update-noticia, o segundo é uma mensagem caso o usuário não preencha da maneira correta
	req.assert('autor', 'Autor é obrigatório').notEmpty();//assert é um metodo do express validator que tem a função de identificar o nome do elemento que eu queira validar. Com base no nome do elemento eu consigo determinar a mensagem que eu quero mostrar ao usuário caso uma condição de validação não seja atendida, o primeiro parametro é o nome do autor no form-update-noticia, o segundo é uma mensagem caso o usuário deixe o autor vazio
	req.assert('data_noticia', 'Data de notícia é obrigatória').notEmpty();//assert é um metodo do express validator que tem a função de identificar o nome do elemento que eu queira validar. Com base no nome do elemento eu consigo determinar a mensagem que eu quero mostrar ao usuário caso uma condição de validação não seja atendida, o primeiro parametro é a data da notícia no form-update-noticia, o segundo é uma mensagem caso o usuário deixe a data vazia

	var erros=req.validationErrors();//vai retornar verdadeiro ou falso, caso o usuário não atenda alguma restrição retornará true
	if(erros){
		res.render('admin/form_update_noticia.ejs', {validacao:erros, noticia:noticia});//irá aparecer a página do form_update_noticia mostrando os erros, e as que estão certas ficaram escritas
		return;
	}

	var connection= app.config.dbconnection();//acessando o banco de dados
	var noticiasModel= new noticiasDAO(connection);//cria um objeto
	noticiasModel.atualizarNoticia(connection, noticia, noticiasModel.mostraNoticia(connection, id_noticia, function(error, result){//variavel que contem a noticia. conexao.
		if(error){
			console.log(error);
		}
		res.redirect('/noticia?id_noticia='+id_noticia);//para redirecionar para o usuário ver o conteudo atualizado
	}));
}