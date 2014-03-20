var util = require('util');
var BoardObject = require('./BoardObject');
var Caster = require('./Caster');

var TestPlayer = function(world) {
	TestPlayer.super_.call(this, world);
	this.setSpriteSheet(new createjs.SpriteSheet({
		"images" : [ world.assets.getResult("m_mage") ],
		"frames" : {
			"regX" : 105,
			"height" : 210,
			"count" : 50,
			"regY" : 130,
			"width" : 260
		},
		"animations" : {
			"stand" : [ 0, 1, "stand" ],
			"run" : [ 2, 8, "run", 4 ],
			"attack" : [ 32, 45, "stand", 4 ]
		}
	}));
	this.defaultAnimation = "stand";
	this.initialize();
};
// util.inherits(Caster, BoardObject);
util.inherits(TestPlayer, Caster);

module.exports = TestPlayer;