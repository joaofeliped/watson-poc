var express = require('express');
var	bodyParser = require('body-parser');
var consign = require('consign');

var app = express();

var token = process.env.TOKEN_FACEBOOK || 'EAACCfCZAHB7YBAAiqxkAskoJbFZABOIqi1lFOIWL8aqUka9O7BObyT56XZC64XmF5EyqEUuz3259vaVaZCvDlggZCWPdXBpUgmdKdrQScZA5Pi6x6ZCSGenzv8Aeos0Uy7ADZA5MJ5eEhcGO5y2xz2xjlgxjZCs7jE466WzLE3hsv9eVS4zIbVKv7';

app.set('token', token);

app.use(bodyParser.json({}));

consign()
    .include('app/routes')
    .then('config/dbConnection.js')
    .then('app/models')
    .then('app/controllers')
    .then('app/util')
    .into(app);

module.exports = app;    