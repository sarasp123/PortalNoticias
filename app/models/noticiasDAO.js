function noticiasDAO(connection){
	//conn=connection;

	this.getNoticias=function(connection, callback){//define um método
		connection.query('select * from noticias ORDER BY data_criacao desc', callback);//é selecionado todas as colunas da tabela noticias sendo as mesmas em ordem decrecente
	}

	this.getNoticia=function(connection, id_noticia, callback){//define um método
		connection.query('select * from noticias where id_noticia=' + id_noticia.id_noticia, callback);//é selecionado todas as colunas da tabela noticias onde o id_noticia é igual ao que estiver armazenado na variável id_noticia.id_noticia
	}

	this.salvarNoticia=function(noticia, connection, callback){//define um método
		connection.query('insert into noticias set ?', noticia, callback);//é inserido na tabela noticias os conteudos do objeto noticia 
	}

	this.get5UltimasNoticias= function(connection, callback){//define um método
		connection.query('select * from noticias order by data_criacao desc limit 5', callback);//é selecionado todas as colunas da tabela noticia ordenado pela data de criação com um limite dos 5 primeiros resultados
	}
	this.excluiNoticia=function(connection, id_noticia, callback){//define um método
		connection.query('delete from noticias where id_noticia='+id_noticia.id_noticia, callback);//é deletado da tabela notícias a notícia que tiver o id_noticia igual ao que estiver armazenado na variável id_noticia.id_noticia
	}
	this.atualizarNoticia=function(connection, noticia, callback){//define um método
		connection.query("update noticias set titulo='" +noticia.titulo+"', noticia='"+noticia.noticia+"',resumo='"+noticia.resumo+"', autor='"+noticia.autor+"',data_noticia='"+noticia.data_noticia+"'where id_noticia="+noticia.id_noticia, callback);//é atualizado a tabela notícia 
	}
	this.mostraNoticia=function(connection, id_noticia, callback){//define um método
		connection.query('select * from noticias where id_noticia=' +id_noticia, callback);//é selecionado todas as colunas da tabela notícia onde o id_noticia for igual o conteúdo que estiver dentro da variável id_noticia
	}
}

module.exports=noticiasDAO;