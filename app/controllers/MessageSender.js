var request = require('request');

const lat = -23.561083;
const long = -46.6687748;

function MessageSender(token) {
	this._token = token;
}

MessageSender.prototype.sendTextMessage = function(recipientId, messageText) {
	var messageData = {
		recipient: {
			id: recipientId
		},

		message: {
			text: messageText
		}
	};

	callSendAPI(messageData, this._token);
}

MessageSender.prototype.sendMenu = function(recipientId) {
	var messageData = {
		recipient: {
			id: recipientId
		},
		message: {
		    attachment: {
		      type:'template',
		      	payload:{
		        	template_type:'button',
		        		text:'Como podemos te ajudar hoje? Clique em uma das opções',
				        buttons:[
					          {
					            type:'postback',
					            title:'Harmonização',
					            payload: 'clicou_harmonizacao'
					          },
					          {
					            type:'postback',
					            title:'Informações gerais',
					            payload: 'clicou_informacoes_gerais'
					          }
				        	]
				      	}
		   	 	}
		 }  	 	
	};

	callSendAPI(messageData, this._token);
}

MessageSender.prototype.sendComidasParaHarmonizarCaroussel = function(recipientId) {
	var messageData = {
		recipient: {
			id: recipientId
		},
		message: {
		    attachment: {
		      type:'template',
		      	payload:{
		        	template_type:'generic',
		        		elements:[
		        			{
					            title: 'Carnes vermelha',
					            image_url: 'https://static.vix.com/pt/sites/default/files/styles/large/public/bdm/file-mignon-molho-limao.jpg?itok=DAlXrtrf',
					            buttons:[
					             {
					                type:"postback",
					                title:"Escolher",
					                payload:"escolheu_comida"
					              }              
					            ]
					        },
				           {
					            title: 'Aves',
					            image_url: 'http://bemfeitinho.net/custom/30/uploads/receita_dia_/2015/setembro/FrangoAssadoAgridoce.jpg',
					            buttons:[
					             {
					                type:"postback",
					                title:"Escolher",
					                payload:"escolheu_comida"
					              }              
					            ]
					        },
					        {
					            title: 'Massas',
					            image_url: 'http://www.gazetadopovo.com.br/blogs/wp-content/uploads/sites/55/import/massa_caseira_espaco_gourmet.jpg',
					            buttons:[
					             {
					                type:"postback",
					                title:"Escolher",
					                payload:"escolheu_comida"
					              }              
					            ]
					        },
					        {
					            title: 'Carne suína',
					            image_url: 'http://content.paodeacucar.com/wp-content/uploads/2017/02/carne-suina-pernil.jpg',
					            buttons:[
					             {
					                type:"postback",
					                title:"Escolher",
					                payload:"escolheu_comida"
					              }              
					            ]
					        },
					        {
					            title: 'Peixes e frutos do mar',
					            image_url: 'http://www.viladonpatto.com.br/assets/uploads/blog/tenwvd2yi8gccw84o0.jpg',
					            buttons:[
					             {
					                type:"postback",
					                title:"Escolher",
					                payload:"escolheu_comida"
					              }              
					            ]
					        },
					        {
					            title: 'Vegetais',
					            image_url: 'http://www.foodservicenews.com.br/wp-content/uploads/2014/02/rec-elab-vegetais-no-prato.jpg',
					            buttons:[
					             {
					                type:"postback",
					                title:"Escolher",
					                payload:"escolheu_comida"
					              }              
					            ]
					        },
					        {
					            title: 'Queijos',
					            image_url: 'http://www.mundoboaforma.com.br/wp-content/uploads/2017/05/queijos-620x325.jpg',
					            buttons:[
					             {
					                type:"postback",
					                title:"Escolher",
					                payload:"escolheu_comida"
					              }              
					            ]
					        },
					        {
					            title: 'Carne de caça e cordeiro',
					            image_url: 'http://www.blogvinhotinto.com.br/wp-content/uploads/2015/11/download-61.jpg',
					            buttons:[
					             {
					                type:"postback",
					                title:"Escolher",
					                payload:"escolheu_comida"
					              }              
					            ]
					        },
					        {
					            title: 'Sobremesas',
					            image_url: 'http://infograficos.estadao.com.br/paladar/sobremesas-de-natal/imagens/naked-cake-doce-de-leite-morangos.jpg',
					            buttons:[
					             {
					                type:"postback",
					                title:"Escolher",
					                payload:"escolheu_comida"
					              }              
					            ]
					        }
        				]
		        		
				      	}
		   	 	}
		 }  	 	
	}

	callSendAPI(messageData, this._token);
}	

MessageSender.prototype.sendVinhosList1 = function(recipientId) {
	var messageData = {
		recipient: {
			id: recipientId
		},
		message: {
			attachment: {
				type: 'template',
				payload: {
					template_type: 'list',
					top_element_style: 'compact',
					elements: [
						{
				            title: 'TESORO DE BULLAS',
				            subtitle: 'R$ 69,00 - VINHO TINTO TESORO DE BULLAS MONASTRELL 750 ML',
				            image_url: 'https://www.grandcru.com.br/ccstore/v1/images/?source=/file/v319394823130063010/products/ESBDR0149A09.TESORO-DE-BULLAS-MONASTREL.jpg&height=300&width=300',
				            buttons: [
				              {
				                title: 'Comprar',
				                type: 'web_url',
				                url: 'https://www.grandcru.com.br/vinho-tinto-tesoro-de-bullas-monastrell-750-ml/product/ESBDR0149A09',
				                messenger_extensions: true,
				                webview_height_ratio: 'tall',
				                fallback_url: 'https://www.grandcru.com.br'            
				              }
				            ]
				        },
				        {
				            title: 'BOUCHARD',
				            subtitle: 'R$ 959,00 - VINHO TINTO BOUCHARD LES PORRETS-SAINT-GEORGES PREMIER CRU 750 ML',
				            image_url: 'https://www.grandcru.com.br/ccstore/v1/images/?source=/file/v3411471344072860295/products/FRBOU6006A11.BOUCHARD-NUITS-SAINT-GEROGES-LES-PORRETS-SAINT-GEORGES-PREMIER-CRU.jpg&height=300&width=300',
				            buttons: [
				              {
				                title: 'Comprar',
				                type: 'web_url',
				                url: 'https://www.grandcru.com.br/vinho-tinto-bouchard-les-porrets-saint-georges-premier-cru-750-ml/product/FRBOU6006A11',
				                messenger_extensions: true,
				                webview_height_ratio: 'tall',
				                fallback_url: 'https://www.grandcru.com.br'            
				              }
				            ]
				        },
				        {
				            title: 'CHÂTEAU BELGRAVE',
				            subtitle: 'R$ 519,00 - VINHO TINTO CHÂTEAU BELGRAVE 2010 750 ML',
				            image_url: 'https://www.grandcru.com.br/ccstore/v1/images/?source=/file/v5480148780701983312/products/FRBGR0149A10.CHATEAU-BELGRAVE.jpg&height=300&width=300',
				            buttons: [
				              {
				                title: 'Comprar',
				                type: 'web_url',
				                url: 'https://www.grandcru.com.br/vinho-tinto-chateau-belgrave-750-ml/product/FRBGR0149A10',
				                messenger_extensions: true,
				                webview_height_ratio: 'tall',
				                fallback_url: 'https://www.grandcru.com.br'            
				              }
				            ]
				        },
				        {
				            title: 'CHÂTEAU D\'ARMAILHAC',
				            subtitle: 'R$ 779,00 -VINHO TINTO CHÂTEAU D\'ARMAILHAC 2011 750 ML',
				            image_url: 'https://www.grandcru.com.br/ccstore/v1/images/?source=/file/v2728527435538501278/products/FRCRM0149A11.vinho-tinto-armailhac-2011.JPG&height=300&width=300',
				            buttons: [
				              {
				                title: 'Comprar',
				                type: 'web_url',
				                url: 'https://www.grandcru.com.br/vinho-tinto-chateau-darmailhac-750-ml/product/FRCRM0149A11',
				                messenger_extensions: true,
				                webview_height_ratio: 'tall',
				                fallback_url: 'https://www.grandcru.com.br'            
				              }
				            ]
				        }
					],
		    		buttons: [
			          {
			            title: "Ver mais",
			            type: "postback",
			            payload: 'ver_mais_vinhos_1'            
			          }
			        ]
		    	}
			}
		}
	};

	callSendAPI(messageData, this._token);
}

MessageSender.prototype.sendVinhosList2 = function(recipientId) {
	var messageData = {
		recipient: {
			id: recipientId
		},
		message: {
			attachment: {
				type: 'template',
				payload: {
					template_type: 'list',
					top_element_style: 'compact',
					elements: [
						{
				            title: 'CHÂTEAU D\'ISSAN',
				            subtitle: 'R$ 824,00 - VINHO TINTO CHÂTEAU D\'ISSAN 2011 750 ML',
				            image_url: 'https://www.grandcru.com.br/ccstore/v1/images/?source=/file/v526689290206439767/products/FRCDI0149A11.vinho-tinto-d-issan-2011.JPG&height=300&width=300',
				            buttons: [
				              {
				                title: 'Comprar',
				                type: 'web_url',
				                url: 'https://www.grandcru.com.br/vinho-tinto-chateau-dissan-750-ml/product/FRCDI0149A11',
				                messenger_extensions: true,
				                webview_height_ratio: 'tall',
				                fallback_url: 'https://www.grandcru.com.br'            
				              }
				            ]
				        },
				        {
				            title: 'CHÂTEAU GISCOURS',
				            subtitle: 'R$ 999,00 - VINHO TINTO CHÂTEAU GISCOURS 2010 750 ML',
				            image_url: 'https://www.grandcru.com.br/ccstore/v1/images/?source=/file/v260372116018825107/products/FRGIS0149A10.CHATEAU-GISCOURS.jpg&height=300&width=300',
				            buttons: [
				              {
				                title: 'Comprar',
				                type: 'web_url',
				                url: 'https://www.grandcru.com.br/vinho-tinto-chateau-giscours-750-ml/product/FRGIS0149A10',
				                messenger_extensions: true,
				                webview_height_ratio: 'tall',
				                fallback_url: 'https://www.grandcru.com.br'            
				              }
				            ]
				        },
				        {
				            title: 'LAXAS ALBARIÑO',
				            subtitle: 'R$ 124,00 - VINHO BRANCO LAXAS ALBARIÑO 2011 750 ML',
				            image_url: 'https://www.grandcru.com.br/ccstore/v1/images/?source=/file/v8831156227315238160/products/ESLAX0157A11.LAXAS-ALBARINO.jpg&height=300&width=300',
				            buttons: [
				              {
				                title: 'Comprar',
				                type: 'web_url',
				                url: 'https://www.grandcru.com.br/vinho-branco-laxas-albarino-750-ml/product/ESLAX0157A11',
				                messenger_extensions: true,
				                webview_height_ratio: 'tall',
				                fallback_url: 'https://www.grandcru.com.br'            
				              }
				            ]
				        },
				        {
				            title: 'DELAS FRÈRES',
				            subtitle: 'R$ 639,00 - VINHO TINTO DELAS FRÈRES HERMITAGE DOMAINE DE LA TOURETTE 2010 750 ML',
				            image_url: 'https://www.grandcru.com.br/ccstore/v1/images/?source=/file/v8668276103517012230/products/FRDEL1605A10.DELAS-FRERES-HERMITAGE-DOMAINE-DE-LA-TOURETTE.jpg&height=300&width=300',
				            buttons: [
				              {
				                title: 'Comprar',
				                type: 'web_url',
				                url: 'https://www.grandcru.com.br/vinho-tinto-delas-freres-hermitage-domaine-de-la-tourette-750-ml/product/FRDEL1605A10',
				                messenger_extensions: true,
				                webview_height_ratio: 'tall',
				                fallback_url: 'https://www.grandcru.com.br'            
				              }
				            ]
				        }
					],
		    		buttons: [
			          {
			            title: "Ver mais",
			            type: "postback",
			            payload: 'ver_mais_vinhos_2'            
			          }
			        ]
		    	}
			}
		}
	};

	callSendAPI(messageData, this._token);
}

MessageSender.prototype.sendSubMenuInformacoesGerais = function(recipientId) {
	var messageData = {
		recipient: {
			id: recipientId
		},
		message: {
		    attachment: {
		      type:'template',
		      	payload:{
		        	template_type:'button',
		        		text:'O que você gostaria de saber?',
				        buttons:[
					          {
					            type:'postback',
					            title:'Lojas',
					            payload: 'clicou_lojas'
					          }
				        	]
				      	}
		   	 	}
		 }  	 	
	};

	callSendAPI(messageData, this._token);
}

MessageSender.prototype.sendEstadosCaroussel = function(recipientId) {
	var messageData = {
		recipient: {
			id: recipientId
		},
		message: {
		    attachment: {
		      type:'template',
		      	payload:{
		        	template_type:'generic',
		        		elements:[
				           {
					            title: 'São Paulo',
					            image_url: 'http://www.riomusicconference.com.br/wp-content/uploads/2015/05/Sao-Paulo-bridge.jpg',
					            buttons:[
					             {
					                type:"postback",
					                title:"Escolher",
					                payload:"escolheu_estado"
					              }              
					            ]
					        },
					        {
					            title: 'Amazonas',
					            image_url: 'https://abrilviagemeturismo.files.wordpress.com/2016/12/am61.jpg?quality=70&strip=info&w=919',
					            buttons:[
					             {
					                type:"postback",
					                title:"Escolher",
					                payload:"escolheu_estado"
					              }              
					            ]
					        },
					        {
					            title: 'Bahia',
					            image_url: 'https://cdn.zarpo.com.br/magazine/wp-content/uploads/2015/03/Para%C3%ADsos-praias-ilhas-e-cidades-da-Bahia-900x450.jpg',
					            buttons:[
					             {
					                type:"postback",
					                title:"Escolher",
					                payload:"escolheu_estado"
					              }              
					            ]
					        },
					        {
					            title: 'Ceará',
					            image_url: 'http://s2.glbimg.com/NHgfY3PNxqaX5JzecVjP0d0VZDg=/s.glbimg.com/jo/g1/f/original/2015/06/03/fortaleza-turismo.jpg',
					            buttons:[
					             {
					                type:"postback",
					                title:"Escolher",
					                payload:"escolheu_estado"
					              }              
					            ]
					        },
					        {
					            title: 'Distrito Federal',
					            image_url: 'https://abrilviagemeturismo.files.wordpress.com/2016/12/foto-abre-df041.jpg?quality=70&strip=info&w=868',
					            buttons:[
					             {
					                type:"postback",
					                title:"Escolher",
					                payload:"escolheu_estado"
					              }              
					            ]
					        },
					        {
					            title: 'Espírito Santo',
					            image_url: 'http://www.turismoecia.jor.br/wp-content/uploads/2017/01/ciclovia_terceira_ponte_00.jpg',
					            buttons:[
					             {
					                type:"postback",
					                title:"Escolher",
					                payload:"escolheu_estado"
					              }              
					            ]
					        },
					        {
					            title: 'Goiás',
					            image_url: 'http://www.brasil-turismo.com/imagens/goias.jpg',
					            buttons:[
					             {
					                type:"postback",
					                title:"Escolher",
					                payload:"escolheu_estado"
					              }              
					            ]
					        },
					        {
					            title: 'Minas Gerais',
					            image_url: 'https://www.estadosecapitaisdobrasil.com/wp-content/uploads/2014/11/ouro-preto-minas-gerais.jpg',
					            buttons:[
					             {
					                type:"postback",
					                title:"Escolher",
					                payload:"escolheu_estado"
					              }              
					            ]
					        },
					        {
					            title: 'Mato Grosso do Sul',
					            image_url: 'https://www.estadosecapitaisdobrasil.com/wp-content/uploads/2014/11/vista-parcial-campo-grande-mato-grosso-do-sul-1024x681.jpg',
					            buttons:[
					             {
					                type:"postback",
					                title:"Escolher",
					                payload:"escolheu_estado"
					              }              
					            ]
					        },
					        
        				]
		        		
				      	}
		   	 	}
		 }  	 	
	}

	callSendAPI(messageData, this._token);
}	

MessageSender.prototype.sendLojasCaroussel = function(recipientId) {
	var messageData = {
		recipient: {
			id: recipientId
		},
		message: {
		    attachment: {
		      type:'template',
		      	payload:{
		        	template_type:'generic',
		        		elements:[
				           {
					            title: 'Grand Cru Matriz',
					            image_url: 'http://2.bp.blogspot.com/-5GPZJL1sW2A/TMb3_UJqBfI/AAAAAAAABMw/iuiNaYG_EM0/s1600/logo-grand-cru.jpg',
					            buttons:[
					             {
					                type:"postback",
					                title:"Escolher",
					                payload:"escolheu_loja"
					              }              
					            ]
					        },
					        {
					            title: 'Grand Cru Moema',
					            image_url: 'http://2.bp.blogspot.com/-5GPZJL1sW2A/TMb3_UJqBfI/AAAAAAAABMw/iuiNaYG_EM0/s1600/logo-grand-cru.jpg',
					            buttons:[
					             {
					                type:"postback",
					                title:"Escolher",
					                payload:"escolheu_loja"
					              }              
					            ]
					        },
					        {
					            title: 'Grand Cru Vila Nova Conceição',
					            image_url: 'http://2.bp.blogspot.com/-5GPZJL1sW2A/TMb3_UJqBfI/AAAAAAAABMw/iuiNaYG_EM0/s1600/logo-grand-cru.jpg',
					            buttons:[
					             {
					                type:"postback",
					                title:"Escolher",
					                payload:"escolheu_loja"
					              }              
					            ]
					        }
					        
        				]
		        		
				      	}
		   	 	}
		 }  	 	
	}

	callSendAPI(messageData, this._token);
}	

MessageSender.prototype.sendMenuInformacoesLoja = function(recipientId) {
	var messageData = {
		recipient: {
			id: recipientId
		},
		message: {
		    attachment: {
		      type:'template',
		      	payload:{
		        	template_type:'button',
		        		text:'Qual informação você deseja?',
				        buttons:[
					          {
					            type:'postback',
					            title:'Localização',
					            payload: 'clicou_localizacao_loja'
					          },
					          {
					            type:'postback',
					            title:'Contato',
					            payload: 'clicou_contato_loja'
					          },
					          {
					            type:'postback',
					            title:'Funcionamento',
					            payload: 'clicou_horario_funcionamento_loja'
					          }
				        	]
				      	}
		   	 	}
		 }  	 	
	};

	callSendAPI(messageData, this._token);
}

MessageSender.prototype.sendLocationLoja = function(recipientId) {
	var messageData = {
		recipient: {
			id: recipientId
		},
		message: {
		    attachment: {
		      type:'template',
		      	payload:{
		        	template_type:'generic',
				        elements:{
				        	element: {
						          title: "Localização",
	                        	  image_url: "https:\/\/maps.googleapis.com\/maps\/api\/staticmap?size=764x400&center="+lat+","+long+"&zoom=18&markers="+lat+","+long,
	                        	  item_url: "http:\/\/maps.apple.com\/maps?q="+lat+","+long+"&z=16"
				        		}
				        	}
				      	}
		   	 	}
		 }  	 	
	};

	callSendAPI(messageData, this._token);
}


function callSendAPI(messageData, token) {
	request({
		uri: 'https://graph.facebook.com/v2.6/me/messages',
		qs: {access_token: token},
		method: 'POST',
		json: messageData
	}, function(erro, response, body){
		//console.log(response);
		if(!erro && response.statusCode == 200) {
			var recipientID = body.recipient_id;
			var messageID = body.message_id;
		} else {
			//console.log(erro);
		}
	});
}

module.exports = function() {
	return MessageSender;
}