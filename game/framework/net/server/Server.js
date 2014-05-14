var util = require('util');
var app = require('express')();
var mysql = require('mysql');

/**
 * the server behind this game framework
 * 
 * @constructor
 * @this {Server}
 * @param opts
 */
var Server = function(opts) {
	var server = this;

	this.server = require('http').createServer(app);
	this.io = require('socket.io').listen(this.server);

	this.listeners = [];

	this.io.set('log level', 1); // hide debug message
	this.opts = opts;
};

Server.prototype.start = function() {
	var self = this;

	this.server.listen(this.opts.port, function() {
		console.log("server listening on port " + self.opts.port);
	});

	this.io.sockets.on('connection', function(socket) {

		self.listeners.forEach(function(listener) {
			console.log(listener.NAME + ' listened');
			if (listener.NAME) {
				socket.on(listener.NAME, function(data) {
					console.log(socket.id + " >>> [" + listener.NAME + "] ");
				//	console.log(data);
					var sm = new listener(data, socket);
					delete sm;
				});
			} else {
				listener(socket);
			}
		});

		/*
		 * The MSG Where player disconnected from the server
		 */
		socket.on('disconnect', function(data) {
			console.log("[DISCONNECTED]" + socket.id);

		});

		console.log("[Connected] " + socket.id);

		socket.on('CM_TEST', function(data) {
			console.log(" >> [CM_TEST] ");
			console.log(data);
		});

		socket.emit('SM_TEST', {
			data : "ping"
		});

		// END
	});
};

Server.prototype.register = function(className) {
	console.log(className);
	this.listeners.push(className);
};
/**
 * Server connection "on"
 * 
 * @this {Server}
 * @param e,
 *            callback
 */
Server.prototype.on = function(e, callback) {
	callback.NAME = e;
	this.register(callback);
};

/**
 * Server emit
 * 
 * @param MessageObject
 */
Server.prototype.emit = function(socket, object) {
	console.log(" <<< [" + object.NAME + ']');
	// console.log(object.data);
	socket.emit(object.NAME, object.data);
}

module.exports = Server;