var util = require('../../../framework/Util');
var NetworkGameplay = require('../../../framework/gameplay/NetworkGameplay');

/**
 * Speed Mode is a match mode that Players race against each other.
 * inherited from NetworkGameplay
 * @constructor
 * @this {SpeedModeGameplay}
 * @param data 
 */
var SpeedModeGameplay = function (data) {
    this.timer = data.timer;
};

util.inherits(SpeedModeGameplay, NetworkGameplay);
module.exports = SpeedModeGameplay;