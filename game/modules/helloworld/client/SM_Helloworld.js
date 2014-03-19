var THREE = require('../../../vendor/Three');
var util = require('../../../framework/Util');
var GameObjectManager = require('../../../framework/GameObjectManager');
var World = require('../../../framework/World');
var io = require('../../../vendor/socket.io-client');
var ClientMessage = require('../../../framework/net/client/ClientMessage');
var ServerMessage = require('../../../framework/net/client/ServerMessage');
var CM_Helloworld = require('./CM_Helloworld');
var CM_Login = require('../../auth/client/CM_Login');
/**
 * Server side response send to client for establishing connection
 * @constructor
 * @this {SM_Helloworld}
 * @param data 
 */
var SM_Helloworld = function(data) {
	//connection established
	var cm = new CM_Helloworld({
		version : World.instance.opts.VERSION
	});
	cm.emit();

};


util.inherits(SM_Helloworld, ServerMessage);
SM_Helloworld.NAME = "SM_helloworld";

module.exports = SM_Helloworld;
