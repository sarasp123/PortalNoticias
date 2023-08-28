var app = require('./config/server.js'); //requisitando a variavel app no arquivo sever

app.listen(3000, function(){ //este app.listen está escutando requisições e esse 3000 se refere a porta 3000 (local localhost), e chamando uma função anônima
	console.log('Servidor rodando com Express');//o console.log tem a função para aparecer no servidor, e esse "Servidor rodando com Express" irá aparecer no console
});
