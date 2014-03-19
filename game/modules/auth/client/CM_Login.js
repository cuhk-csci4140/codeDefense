
var THREE = require('../../../vendor/Three');
var util = require('../../../framework/Util');
var GameObjectManager = require('../../../framework/GameObjectManager');
var World = require('../../../framework/World');
var io = require('../../../vendor/socket.io-client');
var ClientMessage = require('../../../framework/net/client/ClientMessage');
var ServerMessage = require('../../../framework/net/client/ServerMessage');
var AbstractConnection = require('../../../framework/net/client/AbstractConnection');



/**
 * Client Message send to server for login
 * @constructor
 * @this {CM_Login}
 * @param info 
 */
var CM_Login = function( info ){
	this.NAME = "CM_Login";
	this.connection = AbstractConnection.instance;
	
	this.data = { user_id : info.id, user_token : info.token };

};
util.inherits(CM_Login,ClientMessage);


module.exports = CM_Login;
