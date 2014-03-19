
var THREE = require('../../../vendor/Three');
var util = require('../../../framework/Util');
var GameObjectManager = require('../../../framework/GameObjectManager');
var World = require('../../../framework/World');
var io = require('../../../vendor/socket.io-client');
var ClientMessage = require('../../../framework/net/client/ClientMessage');
var ServerMessage = require('../../../framework/net/client/ServerMessage');

var RoomModule = require('../../room/client/module');

/**
 * Server Message response for login
 * @constructor
 * @this {SM_Login_Response}
 * @param data 
 */
var SM_Login_Response = function(data) {

	if (data.message == 'success') {
		//	alert('login success');
		World.instance.modules[SM_Login_Response.AuthModuleNAME].user = data.user;
		console.log("login success");
		showRDiv('modeSelect');

		//overlay => Mode Selection
		//add username to the overlay
		}else if (data.message == 'request-nickname'){
			showRDiv('changeNickname');
		} else {
		World.instance.overlay.changeState('title', {
			msg : 'Login Failed , reason:' + data.message
		});

	}

};

util.inherits(SM_Login_Response, ServerMessage);
SM_Login_Response.AuthModuleNAME = "Auth-Module";
SM_Login_Response.NAME = "SM_Login_Response";

module.exports = SM_Login_Response;
