var util = require('../../../framework/Util');
var NetworkGameplay = require('../../../framework/gameplay/NetworkGameplay');


/**
 * Free Mode is a challenge mode that Players can jump endlessly.
 * inherited from NetworkGameplay 
 * @constructor
 * @this {FreeModeGameplay}
 * @param data 
 */
var FreeModeGameplay = function (data) {
    this.height = data.height;
    this.timer = data.timer;
};

util.inherits(FreeModeGameplay, NetworkGameplay);
module.exports = FreeModeGameplay;