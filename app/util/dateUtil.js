'use strict';

const moment = require('moment');

module.exports.formatarData = function(data, formato) {
	return moment(data).format(formato);
}

module.exports.diaDaSemana = function() {
	return moment().day();
}

module.exports.horaAtual = function() {
	return moment().hour();
}

module.exports.minutoAtual = function() {
	return moment().minute();
}