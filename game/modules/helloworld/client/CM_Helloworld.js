var THREE = require('../../../vendor/Three');
var util = require('../../../framework/Util');
var GameObjectManager = require('../../../framework/GameObjectManager');
var World = require('../../../framework/World');
var io = require('../../../vendor/socket.io-client');
var ClientMessage = require('../../../framework/net/client/ClientMessage');
var ServerMessage = require('../../../framework/net/client/ServerMessage');
var AbstractConnection = require('../../../framework/net/client/AbstractConnection');

/**
 * Client side msg send to server for establishing connection
 * @constructor
 * @this {CM_Helloworld}
 * @param info 
 */
var CM_Helloworld = function( info ){
	this.NAME = "CM_helloworld";
	this.connection = AbstractConnection.instance;
	this.data = { info : info};

};
util.inherits(CM_Helloworld,ClientMessage);


module.exports = CM_Helloworld;
