const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const busboy = require('connect-busboy');
const busboyBodyParser = require('busboy-body-parser');
module.exports = function(app) {
	'use strict';
	app.use( bodyParser.json())
	app.use(bodyParser.urlencoded({ extended: true }));
	app.use(busboy());
	app.use(busboyBodyParser());
	app.use( express.static( __dirname + "./../../dist/onemission"))
	app.set('trust proxy', 1) // trust first proxy
	app.use(session({
	  secret: 'keyboard cat',
	  resave: false,
	  saveUninitialized: true,
	  cookie: { maxAge: 6000000 }
	}))
};