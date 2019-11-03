function NFes(connection) {
	this._connection = connection();
}

NFes.prototype.buscarRacoesQueMaisVendem = function(callback) {
  this._connection.open(function(err1, mongoclient){
    mongoclient.collection('NFes', function(err2, collection){
      collection.aggregate([
          {
            $project: {
               det: {
                  $filter: {
                     input: "$det",
                     as: "produto",
                     cond: { $eq: [ "$$produto.prod.NCM", '23099010' ] }
                  }
               }
            }
         },
          { $unwind : "$det" },
          { $group : {
            _id : {xProd: '$det.prod.xProd', "count": { "$sum": 1 }},
            total : { $sum: "$det.prod.vUnTrib" },
          },
        },
        { $sort: { total: -1 } },
        { $limit: 10 }
        ], function(err, result) {
            mongoclient.close();
            callback(result);
        });
    });
  });
}

NFes.prototype.buscarValorTotalDeRacoesVendidas = function(callback) {
  this._connection.open(function(err1, mongoclient){
    mongoclient.collection('NFes', function(err2, collection){
      collection.aggregate([
          {
            $project: {
               det: {
                  $filter: {
                     input: "$det",
                     as: "produto",
                     cond: { $eq: [ "$$produto.prod.NCM", '23099010' ] }
                  }
               }
            }
         },
           { $unwind : "$det" },
          { $group : {
            _id : null,
            count:{$sum:1}
          },

        },
        ], function(err, result) {
          mongoclient.close();
            callback(result);
        });
    });
  });
}

NFes.prototype.buscarLojasQueMaisVendem = function(callback) {
	this._connection.open(function(err1, mongoclient){
		mongoclient.collection('NFes', function(err2, collection){
			collection.aggregate([
          { $project : {
            'emit.CNPJ' : 1,
            'emit.xNome' : 1,
            'emit.enderEmit.xBairro': 1,
            det: 1
          }},
          { $unwind : "$det" },
          { $group : {
            _id : {cnpj : "$emit.CNPJ", xNome: '$emit.xNome', xBairro: '$emit.enderEmit.xBairro'},
            total : { $sum : "$det.prod.vUnTrib" },
          },
      	},
      	{ $sort: { total: -1 } },
      	{ $limit: 3 }
        ], function(err, result) {
        		mongoclient.close();
         		callback(result);
		    });
		});
	});
}

NFes.prototype.buscarValorTotalDeVendas = function(callback) {
	this._connection.open(function(err1, mongoclient){
		mongoclient.collection('NFes', function(err2, collection){
			collection.aggregate([
       		 { $unwind : "$det" },
          { $group : {
            _id : null,
            count:{$sum:"$det.prod.vUnTrib"}
          },

      	},
        ], function(err, result) {
        	mongoclient.close();
         		callback(result);
		    });
		});
	});
}

NFes.prototype.buscarProdutosMaisVendidosPorLoja = function(callback) {
  this._connection.open(function(err1, mongoclient){
    mongoclient.collection('NFes', function(err2, collection){
      collection.aggregate([
          { $project : {
            'emit.CNPJ' : 1,
            'emit.xNome' : 1,
            det: 1,
            produtos: '$produtosVendidos',
            quantidadeProdutos: { $size: "$det" }
          }},
          { $unwind : "$det" },
          { $group : {
            _id : {cnpj : "$emit.CNPJ", xNome: '$emit.xNome', produtos: '$produtos'},
            produtosVendidos: { $push:  "$det" }
            //total : { $sum : "$det.prod.vUnTrib" },
          },
        },
        //{ $sort: { total: -1 } },
        { $limit: 3 }
        ], function(err, result) {
            mongoclient.close();
            callback(result);
        });
    });
  });
}

NFes.prototype.buscarBairroDosClientes = function(callback) {
	this._connection.open(function(err1, mongoclient){
		mongoclient.collection('NFes', function(err2, collection){
			collection.aggregate([
          { $project : {
            //'dest.CPF' : 1,
            //'dest.xNome' : 1,
            'dest.enderDest.xBairro': 1,
          }},
          { $match: { 'dest.enderDest': {$ne: null} } },
          
          //{ $unwind : "$dest" },
          { $group : {
            _id : {xBairro: '$dest.enderDest.xBairro'},
            count:{$sum:1}
          //  total : { $sum : "$dest" }
          },
      	},
      	{ $sort: { count: -1 } },
      	{ $limit: 8 }
        ], function(err, result) {
        	mongoclient.close();
         		callback(result);
		    });
		});
	});
}

NFes.prototype.buscarNumeroDeClientesComBairro = function(callback) {
	this._connection.open(function(err1, mongoclient){
		mongoclient.collection('NFes', function(err2, collection){
			collection.aggregate([
          { $match: { 'dest.enderDest': {$ne: null} } },
         
          { $group : {
            _id : null,
            count:{$sum:1}
          },

      	},
        ], function(err, result) {
        	mongoclient.close();
         		callback(result);
		    });
		});
	});
}

module.exports = function() {
	return NFes;
}