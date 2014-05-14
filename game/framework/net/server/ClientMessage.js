var util = require('../../Util');
var GameObjectManager = require('../../GameObjectManager');
var World = require('../../../World');
var io = require('../../../vendor/socket.io-client');

var ClientMessage = function(data) {
	this.__defineGetter__("connection", function() {
		return Connection.instance;
	});
};
ClientMessage.NAME = "ABSTRACT_MESSENGE";

module.exports = ClientMessage;