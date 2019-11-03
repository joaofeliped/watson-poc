var currencyFormatter = require('currency-formatter');
var CNPJ = require("cpf_cnpj").CNPJ;

module.exports.receberRespostaDoWatson = function(app, res, token, senderID) {
	var MessageSender = new app.app.controllers.MessageSender(token);

	if(res.intents && res.intents.length > 0) {
		switch(res.intents[0].intent) {
			case 'quais_marcas_de_racao_mais_vendidas':
				buscarProdutosQueMaisVendem(app, res, token, senderID);
			break;

			case 'lojas_que_mais_vendem':
				buscarLojasQueMaisVendem(app, res, token, senderID);
			break;

			case 'produtos_mais_vendidos_por_loja':
				buscarProdutosMaisVendidosPorLoja(app, res, token, senderID);
			break;

			case 'bairros_dos_clientes':
				buscarBairroDosClientes(app, res, token, senderID);
			break;

			default:
				MessageSender.sendTextMessage(senderID, res.output.text[0]);
		}
	} else {
		MessageSender.sendTextMessage(senderID, res.output.text[0]);
	}
}

function buscarProdutosQueMaisVendem(app, res, token, senderID) {
	var MessageSender = new app.app.controllers.MessageSender(token); 

	var conn = app.config.dbConnection;
	var NFes = new app.app.models.NFes(conn);

	NFes.buscarRacoesQueMaisVendem(function(racoes){
		if(racoes.length > 0) {
			NFes.buscarValorTotalDeRacoesVendidas(function(valorTotalDeRacoes){
				var valorTotal = valorTotalDeRacoes[0].count;

				MessageSender.sendTextMessage(senderID, 'Encontrei as ' + racoes.length + 
					' marcas de ração que mais vendem.');

				var tempo = 1500;

				racoes.forEach(function(racao){
					setTimeout(function(){
						MessageSender.sendTextMessage(senderID, 'A marca ' 
								+ racao._id.xProd +	' vendeu ' + racao._id.count + 
							' unidade e teve um total de vendas de ' + 
							currencyFormatter.format(racao.total, { locale: 'pt-BR' }) + 
							' o que representa um percentual de ' + 
							Math.round(((racao._id.count/valorTotal) * 100)) + '% sobre a venda total.');
					}, tempo);

					tempo += 3000;
				});
			});	
		} else {
			MessageSender.sendTextMessage(senderID, 'Infelizmente não encontrei nenhuma marca de ração.');
		}
	});
}	

function buscarBairroDosClientes(app, res, token, senderID) {
	var MessageSender = new app.app.controllers.MessageSender(token); 

	var conn = app.config.dbConnection;
	var NFes = new app.app.models.NFes(conn);

	NFes.buscarBairroDosClientes(function(bairros){
		if(bairros.length > 0) {
			NFes.buscarNumeroDeClientesComBairro(function(numeroDeClientes){
				MessageSender.sendTextMessage(senderID, 'Encontrei clientes nos seguintes bairros:');

				var tempo = 500;
				bairros.forEach(function(bairro){
					tempo += 1000;

					setTimeout(function(){
						MessageSender.sendTextMessage(senderID, bairro._id.xBairro + ': ' 
						+ bairro.count + (bairro.count > 1 ? ' clientes ' : ' cliente ')  + ' representando ' 
						+ Math.round(((bairro.count/numeroDeClientes[0].count) * 100)) + '% da nossa base total.');
					}, tempo);
					
				});
			});
		} else {
			MessageSender.sendTextMessage(senderID, 'Infelizmente não encontrei nenhum bairro.');
		}
	});
}	

function buscarProdutosMaisVendidosPorLoja(app, res, token, senderID) {
	var MessageSender = new app.app.controllers.MessageSender(token); 

	var conn = app.config.dbConnection;
	var NFes = new app.app.models.NFes(conn);

	NFes.buscarProdutosMaisVendidosPorLoja(function(lojas){
		if(lojas.length > 0) {
			MessageSender.sendTextMessage(senderID, 'Encontrei ' + lojas.length + 
				' lojas e os seus produtos mais vendidos foram:');

			var tempo = 1500;

			lojas.forEach(function(loja){
				var mf = 1;
				var m = 0;
				var item;
				for (var i = 0; i < loja.produtosVendidos.length; i++) {
				        for (var j = i; j < loja.produtosVendidos.length; j++) {
				                if (loja.produtosVendidos[i].prod.cProd === loja.produtosVendidos[j].prod.cProd) {
				                	 m++;
				                }

				                if (mf < m) {
				                  mf = m; 
				                  item = loja.produtosVendidos[i];
				                }
				        }
				        m = 0;
				}
				
				
					if(item) {
						setTimeout(function(){
							MessageSender.sendTextMessage(senderID, 'A loja ' + loja._id.xNome + 
								' vendeu ' + mf + ' unidades de ' + item.prod.xProd + ' que possui o NCM ' + item.prod.NCM + 
								' com um percentual de ' + Math.round(((mf/loja.produtosVendidos.length) * 100)) + 
								'% em comparação com outros produtos de sua loja.');
						}, tempo);
					} else {
						setTimeout(function(){
							MessageSender.sendTextMessage(senderID, 'A loja ' + loja._id.xNome + 
								' vendeu ' + mf + ' unidade de ' + loja.produtosVendidos[0].prod.xProd + 
								' que possui o NCM ' + loja.produtosVendidos[0].prod.NCM + 
								' com um percentual de ' + Math.round(((mf/loja.produtosVendidos.length) * 100)) + 
								'% em comparação com outros produtos de sua loja.');
						}, tempo);
					}

					tempo += 2000;
				
			});
			
		} else {
			MessageSender.sendTextMessage(senderID, 'Infelizmente não encontrei nenhum produto.');
		}
	});
}	

function buscarLojasQueMaisVendem(app, res, token, senderID) {
	var MessageSender = new app.app.controllers.MessageSender(token); 

	var conn = app.config.dbConnection;
	var NFes = new app.app.models.NFes(conn);

	NFes.buscarLojasQueMaisVendem(function(lojas){
		if(lojas.length > 0) {
			NFes.buscarValorTotalDeVendas(function(valorTotalDeVendas){
				var valorTotal = valorTotalDeVendas[0].count;

				MessageSender.sendTextMessage(senderID, 'Encontrei as ' + lojas.length + ' lojas que mais vendem na rede.');

				var tempo = 1500;
				var colocacao = 1;

				lojas.forEach(function(loja){
					setTimeout(function(){
						MessageSender.sendTextMessage(senderID, 'A ' + colocacao 
							+ 'ª loja que mais vende na rede é a ' + loja._id.xNome + '.');
						
						colocacao++;
					}, tempo);

					tempo += 1000;

					setTimeout(function(){
						MessageSender.sendTextMessage(senderID, 'Seu cnpj é ' + CNPJ.format(loja._id.cnpj) + 
							' e ela fica no bairro ' + loja._id.xBairro + '.');
					}, tempo);

					tempo += 1000;

					setTimeout(function(){
						MessageSender.sendTextMessage(senderID, 'Ela teve um total de vendas de ' + 
							currencyFormatter.format(loja.total, { locale: 'pt-BR' }) + ' que corresponde a ' + 
								Math.round(((loja.total/valorTotal) * 100)) + '% do total de faturamento da rede.');
					}, tempo);

					tempo += 3000;
				});
			});	
		} else {
			MessageSender.sendTextMessage(senderID, 'Infelizmente não encontrei nenhuma loja.');
		}	
	});
}