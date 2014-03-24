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
			"initial" : [ 0, 6, null,2 ],
			"travel" : [ 7, 17, "travel" ],
			"explode" : [ 18, 28 ]
		}
	}));
	this.defaultAnimation = "initial";

	this.castTime = 1;
	console.log("Fireball initialized");
	this.initialize();
}
util.inherits(Fireball, Castable);

Fireball.prototype.m1 = function() {

	return this;
};

Fireball.prototype.execute = function(caster, onComplete) {
	this.queue_(function(done) {
		console.log("fireball!");
		var distance = caster.boardWidth - (caster.x + 70);
		this.sprite.setTransform(caster.sprite.x + 70, caster.sprite.y, 1, 1);
		this.position.vertical = caster.position.vertical;
		this.position.horizontal = caster.position.horizontal;
		var level = this.world.activeLevel;
		level.add(this);
		this.gotoAndPlay("initial", done);
	});

	this.queue_(function(done) {
		this.stats.movement = 250;
		this.move_(12, 0, createjs.Ease.quartIn, done);
		onComplete();
	});
	this.triggerAction();

};
