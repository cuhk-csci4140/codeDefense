var util = require('util');
var GameObject = require('../framework/gameobjects/GameObject');

var TestPlayer = function(world) {
	TestPlayer.super_.call(this);
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
util.inherits(TestPlayer, GameObject);

module.exports = TestPlayer;