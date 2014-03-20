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
			"initRun" : [2,4,"run",6],
			"run" : [ 5, 8, "run", 3 ],
			"attack" : [ 32, 45, "stand", 4 ]
		}
	}));
	this.defaultAnimation = "stand";
	console.log("player initialized");
	this.initialize();
};

// util.inherits(Caster, BoardObject);
util.inherits(TestPlayer, Caster);

TestPlayer.prototype.onStartMoving_ = function(){
	this.gotoAndPlay("initRun");
};

TestPlayer.prototype.onStopMoving_ = function() {
	this.gotoAndPlay("stand");
};
module.exports = TestPlayer;