var util = require('util');
var ShootingSpell = require('../../gameobjects/ShootingSpell');

var Fireball = function(world) {

	Fireball.super_.call(this, world);
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
			"initial" : [ 0, 6, null, 4 ],
			"travel" : [ 7, 17, "travel" ],
			"explode" : [ 18, 28, null, 6 ]
		}
	}));
	this.defaultAnimation = "initial";

	this.castTime = 1.5;
	console.log("Fireball initialized");
	this.initialize();
}
util.inherits(Fireball, ShootingSpell);
Fireball.exposeMethods = [ "m1" ];

Fireball.prototype.m1 = function() {
	console.log("m1");
};
Fireball.prototype.m2 = function() {
	console.log("m2");
};

Fireball.prototype.shoot = function(caster, onComplete) {
        //onComplete is from caster/
	console.log("fireball calculating target");
	this.queue_(function(done) {
		console.log("fireball!");
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
		console.log("fireball explode!");
		this.gotoAndPlay("explode", done);
	});
	this.queue_(function(done) {
		console.log("remove fireball");
		var level = this.world.activeLevel;
		level.remove(this);
                
                //done is from Fireball's queue
                done();
                //onComplete is from Caster's queue
                onComplete();
	});
	this.triggerAction();
        
        return function(){}.bind(this);
};



module.exports = Fireball;