/**
 * CSCI4140 Devlopment Server and Build Script use with -dev can build game
 * client script automatically
 */
var express = require('express'), http = require('http'), path = require('path'), routes = require('./routes'), build = require('./build');

var GameServer = require('./game/server/server');

var app = express();

app.configure(function() {
	app.set('port', process.env.PORT || 3000);
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
http.createServer(app).listen(app.get('port'), function() {
	console.log("web server listening on port " + app.get('port'));
});

var game = new GameServer({
	VERSION : '0.0.0',
	KEY : 'CSCI4140',
	port : 7777
});

game.start();
