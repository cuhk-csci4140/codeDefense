//var THREE = require('../../../vendor/Three');
var util = require('../../Util');
var GameObjectManager = require('../../GameObjectManager');
//var World = require('../../World');
var io = require('../../../vendor/socket.io-client');

/**
 * Server Message on the server
 * @constructor
 * @this {ServerMessage}
 * @param data 
 */
var ServerMessage = function(data) {
    this.__defineGetter__("connection", function(){
        return Connection.instance;
    });
};
ServerMessage.NAME = "ABSTRACT_MESSENGE";

module.exports = ServerMessage;