var util = require('util');
var Castable = require('../../gameobjects/Castable');

Fireball = function() {
	Fireball.super_.call(this);
	this.name = "Fireball";
	this.setSpriteSheet(new createjs.SpriteSheet({
		"images" : [ this.world.assets.getResult("fireball") ],
		"frames" : {
			"regX" : 63,
			"height" : 128,
			"count" : 28,
			"regY" : 63,
			"width" : 128
		},
		"animations" : {
			"initial" : [ 0, 6, "travel", 2 ],
			"travel" : [ 7, 17, "travel" ],
			"explode" : [ 18, 28 ]
		}
	}));
	this.defaultAnimation = "initial";
	console.log("Fireball initialized");
	this.initialize();
}
util.inherits(Fireball, Castable);

Fireball.prototype.m1 = function() {
	
	return this;
};

Fireball.prototype.execute = function(caster) {
	console.log("fireball!");
};

