// module of client and server message in authentication
var THREE = require('../../../vendor/Three');
var $ = require('../../../vendor/jQuery');
var util = require('../../../framework/Util');
var GameObjectManager = require('../../../framework/GameObjectManager');
var World = require('../../../framework/World');
var Overlay = require('../../../framework/Overlay');
var Module = require('../../../framework/Module');
var io = require('../../../vendor/socket.io-client');
var ClientMessage = require('../../../framework/net/client/ClientMessage');
var ServerMessage = require('../../../framework/net/client/ServerMessage');
// client messages

// server messages
var SM_Login_Response = require('./SM_Login_Response');
var CM_Login = require('./CM_Login');

/**
 * Initialization module of auth process
 * 
 * @constructor
 * @this {CM_LAuthModuleogin}
 * @param world
 */
var AuthModule = function(world) {
	world.connection.register(SM_Login_Response);
	this.user = null;
	// GUI of the process
	world.overlay
			.add(
					AuthModule.NAME,
					'<div class = "title"><img src="ui_im/title.png"></div>'
							+ '<div>'
							+ '<img style="position:absolute; top:400px;left:40%;" src="ui_im/login_select.png">'
							+ '<div class="bg_box"><img width=80% height=300px src="ui_im/bgbox.png"></div>'
							+ '<div id="loginimg"><img width=100px height=100px src="ui_im/facebook.png">'
							+ '<img style="position:relative; left:40%;" width=100px height=100px" src="ui_im/google.png"></div>'
							+ '<div style="position:absolute;width: 100%;top: 610px;text-align:center"><button id="'
							+ AuthModule.NAME
							+ '_demo_button">Demo USER</button></div>'
							+ '</div>'

			);

	// data exchange
	$('#' + AuthModule.NAME + '_demo_button').click(function() {
		console.log("demo session");
		var username = window.prompt("Your Username", "DEMO_USER");

		//a demo account on early development stage
		var cm = new CM_Login({
			id : 'UNDEFINED@Facebook',
			token : 'ibj1f52cvcpem06dm065skjcq2',
			type : 'account'
		});
		cm.emit();
	});

	

	world.connection.on(world.connection.ON_CONNECT, function(data) {
		world.overlay.changeState('title', {
			msg : "Connected. Initializing the game."
		});
		setTimeout(function() {
			if (typeof showRDiv != "undefined") {
				world.overlay.visible(false);
				showRDiv('login');
				if(typeof  _loginCallback !="undefined"){
					 _loginCallback();
				}
			} else {
				world.overlay.changeState(AuthModule.NAME);
			}
		}, 1000);
	});

	console.log("auth module loaded");
};
util.inherits(AuthModule, Module);
AuthModule.NAME = "Auth-Module";

/**
 * Auth login
 * @param user_id
 * @param user_token
 */
AuthModule.prototype.login = function(user_id, user_token) {
	var cm = new CM_Login({
		id : user_id,
		token : user_token
	});
	cm.emit();
}

module.exports = AuthModule;