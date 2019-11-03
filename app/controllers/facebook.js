var request = require('request');

var ConversationV1 = require('watson-developer-cloud/conversation/v1');

var estados = [];
var contadorDe = 0;
const contadorAte = 4;
 
var conversation = new ConversationV1({
  username: '304efef1-a441-42d6-a554-75b0dcea050f',
  password: 'ea1LALRsBUBb',
  version_date: ConversationV1.VERSION_DATE_2017_05_26
});

function sendToWatson(userText, callback) { 
	conversation.message({
	  input: { text: userText },
	  workspace_id: 'edec1241-34da-4984-a279-bc2a554cfb62'
	 }, function(err, response) {
	     if (err) {
	       console.error(err);
	     } else {
	     	console.log(response);
	       callback(response);
	     }
	});
}

module.exports.verificarToken = function(app, req, res) {
	if (req.query['hub.verify_token'] === app.get('token')) {
      res.send(req.query['hub.challenge']);
   	} else {
      res.send('Error, wrong validation token');
   	}
}

module.exports.enviarMensagem = function(app, req, res) {
	var data = req.body;

	if(data && data.object === 'page') {
		data.entry.forEach(function(entry){
	  		var pageID = entry.id;
			var timeOfEvent = entry.time;

			entry.messaging.forEach(function(event) {
				if(event.message || event.postback) {
					trataMensagem(app, event, app.get('token'));
				} 
			});
		});
	}

   	res.send(req.body);
} 

function trataMensagem(app, event, token) {
	var senderID = event.sender.id;
	var recepientID = event.recipient.id;
	var message = event.message;
	
	request({
		uri: 'https://graph.facebook.com/v2.6/' + senderID 
			+ '?fields=first_name,last_name,profile_pic,locale,timezone,gender&access_token=' + token,
		method: 'GET'
	}, function(erro, response, body){
		if(!erro && response.statusCode == 200) {
			var user = JSON.parse(body);
			
			if(message && message.text && !message.quick_reply) {
				sendToWatson(message.text, function(res){
					app.app.controllers.conversations.respostas.receberRespostaDoWatson(app, res, token, senderID);
				});
			} else if(event.postback && event.postback.payload) {
				switch(event.postback.payload) {
					

					default:
						app.app.controllers.conversations.boasVindas.enviarMenuInicial(app, token, senderID);
				}

			} else if(message && message.quick_reply && message.quick_reply.payload) {
				switch(message.quick_reply.payload) {
					
					
					default:
						app.app.controllers.conversations.boasVindas.enviarMenuInicial(app, token, senderID);
				}
			} else if(message.attachments) {
				switch(message.attachments[0].type) {
					
					default:
						app.app.controllers.conversations.boasVindas.enviarMenuInicial(app, token, senderID);
				}
			}
		} else {
			console.log(erro);
		}
	});
}