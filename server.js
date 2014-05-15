#!/bin/env node
//  OpenShift  Node application
//  make sure you fork this project and add public/js/bundle.js to your repo

// no auto build and websocket on openshift 
var express = require('express'), http = require('http'), path = require('path'), routes = require('./routes');
//, build = require('./build');

//Get the environment variables we need.
var ipaddr  = process.env.OPENSHIFT_NODEJS_IP || "127.0.0.1";
var port    = process.env.OPENSHIFT_NODEJS_PORT || 3000;

var app = express();

app.configure(function() {
	app.set('port', port);
	app.set('views', __dirname + '/views');
	app.set('view engine', 'twig');
	// This section is optional and can be used to configure twig.
	app.set('twig options', {
		strict_variables : false
	});
	app.use(express.favicon());
	app.use(express.logger('dev'));
	app.use(express.bodyParser());
	app.use(express.methodOverride());
	app.use(express.cookieParser('your secret here'));
	app.use(express.session());
	app.use(app.router);
	app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function() {
	app.use(express.errorHandler());
});

// router here

app.get('/', routes.game.index);
app.get('/game', routes.game.index);
app.get('/game/test', routes.game.test);
http.createServer(app).listen(port, ipaddr, function() {
	console.log("web server listening on port " + port);
});
/*
var game = new GameServer({
	VERSION : '0.0.0',
	KEY : 'CSCI4140',
	port : 7777
});

game.start();
*/
console.log("Server running at http://" + ipaddr + ":" + port + "/");