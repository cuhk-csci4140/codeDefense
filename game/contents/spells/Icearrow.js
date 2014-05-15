var util = require('util');
var ShootingSpell = require('../../gameobjects/ShootingSpell');

var Icearrow = function(world) {

	Icearrow.super_.call(this, world);
	this.name = "Icearrow";
	this.setSpriteSheet(new createjs.SpriteSheet({
		"images" : [ this.world.assets.getResult("icearrow") ],
		"frames" : {
			"regX" : 80,
			"height" : 160,
			"count" : 12,
			"regY" : 80,
			"width" : 160
		},
		"animations" : {
			"initial" : [ 0, 10, null, 4 ],
			"travel" : [ 11, 11, "travel" ]
		}
	}));
	this.defaultAnimation = "initial";
	this.castTime = 1.5;
	this.cost = 8;
	this.penetrate = true;

	this.baseCost = 10;
	this.damage = 1;
	console.log("Icearrow initialized");
	this.initialize();
}
util.inherits(Icearrow, ShootingSpell);
Icearrow.exposeMethods = [ "scale" ];
Icearrow.prototype.scale = function(scale) {
	if (scale >= 1 && scale <= 4) {
		this.damage = scale;
		this.cost = Math.ceil(Math.pow(this.baseCost, 1 + (scale * 1.2 / 10)));
	} else {
		throw new Error("Ice Arrow can only be scaled upto 4!");
	}
}
Icearrow.prototype.shoot = function(caster, onComplete) {
	// onComplete is from caster/
	console.log("Icearrow calculating target");
	this.queue_(function(done) {
		console.log("Icearrow!");
		this.sprite.setTransform(caster.sprite.x + 70, caster.sprite.y, 1, 1);
		this.position.vertical = caster.position.vertical;
		this.position.horizontal = caster.position.horizontal;
		var level = this.world.activeLevel;
		level.add(this);
		this.stats.movement = 250;
		this.gotoAndPlay("initial", done);

	});

	this.queue_(function(done) {
		this.gotoAndPlay("travel");
		this.moveTo_(this.targetX, this.targetY, createjs.Ease.quartIn, done);
	});

	this.queue_(function(done) {
		this.dealDamage();
		console.log("remove icearrow");

		var level = this.world.activeLevel;
		level.remove(this);

		done();
		// onComplete is from Caster's queue
		onComplete();
	});

	this.triggerAction();

	return function() {
	}.bind(this);
};

module.exports = Icearrow;