var util = require('util');
var BoardObject = require('../../gameobjects/BoardObject');

var Bori = function(world) {
	Bori.super_.call(this, world);
	this.setSpriteSheet(new createjs.SpriteSheet({
		"images" : [ world.assets.getResult("bori") ],
		"frames" : {
			"regX" : 52,
			"height" : 104,
			"count" : 76,
			"regY" : 74.5,
			"width" : 149
		},
		"animations" : {
			"stand" : [ 0, 5, "stand" ],
			"initRun" : [ 6, 7, "run", 2 ],
			"run" : [ 8, 22, "run", 2 ]
		}
	}));
	this.defaultAnimation = "stand";
	console.log("Bori initialized");
	this.initialize();
};

util.inherits(Bori, BoardObject);

TestPlayer.prototype.onStartMoving_ = function() {
	this.gotoAndPlay("initRun");
};

TestPlayer.prototype.onStopMoving_ = function() {
	this.gotoAndPlay("stand");
};

module.exports = Bori;