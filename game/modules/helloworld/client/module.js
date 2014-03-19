var THREE = require('../../../vendor/Three');
var util = require('../../../framework/Util');
var GameObjectManager = require('../../../framework/GameObjectManager');
var World = require('../../../framework/World');
var Module = require('../../../framework/Module');
var io = require('../../../vendor/socket.io-client');
var io = require('../../../vendor/socket.io-client');
var ClientMessage = require('../../../framework/net/client/ClientMessage');
var ServerMessage = require('../../../framework/net/client/ServerMessage');
// client messages

// server messages
var SM_Helloworld = require('./SM_Helloworld');

// GUI to display msg

/**
 * module and GUI of establishing connection between client and server
 * @constructor
 * @this {HelloWorldModule}
 * @param world 
 */
var HelloWorldModule = function(world) {
	world.connection.register(SM_Helloworld);

	world.overlay
			.add(
					'title',
					'<div class="overlay-center"><img src="ui_im/title.png"><br/><span id="title-msg">Connecting to the game server.</span></p></div>');
	world.overlay.changeState('title');
    //connection error
	world.connection
			.on(
					world.connection.ON_ERROR,
					function(data) {
						world.overlay
								.changeState(
										'title',
										{
											msg : "Network error , The game client is unable to gain access to the game server at this time."
										});
					});
    //connection fail
	world.connection
			.on(
					world.connection.ON_DISCONNECT,
					function(data) {
						world.overlay
								.changeState(
										'title',
										{
											msg : "Network : the game client lost its connection to the server."
										});
					});

	console.log("Helloworld module loaded");
};

util.inherits(HelloWorldModule, Module);

module.exports = HelloWorldModule;