var util = require('util');
var AbstractServer = require('../framework/net/server/Server');

/**
 * Game Server
 */

// define my server
// register all modules and server message here
/**
 * the server behind this game framework
 * 
 * @constructor
 * @this {Server}
 * @param opts
 */
var Server = function(opts) {
	Server.super_.call(this, opts);

	// score report listener
	var CM_SCORE = function(data, socket) {
		this.data = data;
		console.log([ socket.id, data ]);
		// console.log(socket);
	};
	CM_SCORE.NAME = "CM_SCORE";
	this.register(CM_SCORE);
	
	
};
util.inherits(Server, AbstractServer);

module.exports = Server;