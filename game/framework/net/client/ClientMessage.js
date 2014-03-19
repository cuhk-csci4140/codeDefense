//var THREE = require('../../../vendor/Three');
var util = require('../../Util');
var GameObjectManager = require('../../GameObjectManager');
//var World = require('../../World');
var io = require('../../../vendor/socket.io-client');
var AbstractConnection = require('./AbstractConnection');
/**
 * Client Message on the client
 * @constructor
 * @this {ClientMessage}
 * @param opts 
 */

var ClientMessage = function(data) {
    this.name = "ABSTRACT_MESSENGE";
    this.data = {};
	//this.connection = AbstractConnection.instance;
};

/**
 * Client Message getSocket
 * @return {socket} this socket
 * @this {ClientMessage}
 */

ClientMessage.prototype.getSocket = function(){
    return this.connection.socket;
};
/**
* Client Message emit this client message
* @return {this}
* @this {ClientMessage}
*/
ClientMessage.prototype.emit = function(){
    return this.connection.emit( this );
};



module.exports = ClientMessage;