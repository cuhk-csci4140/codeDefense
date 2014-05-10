var util = require('util');
var ShootingSpell = require('../../gameobjects/ShootingSpell');

var Pyroblast = function(world) {
	Pyroblast.super_.call(this, world);
	this.name = "Pyroblast";
	this.setSpriteSheet(new createjs.SpriteSheet({
		"images" : [ this.world.assets.getResult("pyroblast") ],
		"frames" : {
			"regX" : 160,
			"height" : 160,
			"count" : 24,
			"regY" : 80,
			"width" : 320
		},
		"animations" : {
			"initial" : [ 0, 4, null, 2 ],
			"travel" : [ 5, 14, "travel", 2 ],
			"explode" : [ 15, 21, "end", 4 ]/*,
			"end" : [ 20, 24, null, 4 ]*/
		}
	}));
	this.defaultAnimation = "initial";
        this.cost = 50;
        this.range = 1; // +- 1 space
        this.aoe = true;
	console.log("Pyroblast initialized");
	this.initialize();
}

util.inherits(Pyroblast, ShootingSpell);

Pyroblast.prototype.shoot = function(caster,onComplete) {
    	console.log("Pyroblast calculating target");
	this.queue_(function(done) {
		console.log("Pyroblast!");
		var distance = caster.boardWidth - (caster.x + 70);
		this.sprite.setTransform(caster.sprite.x + 90 , caster.sprite.y, 1, 1);
		this.position.vertical = caster.position.vertical;
		this.position.horizontal = caster.position.horizontal;
		var level = this.world.activeLevel;
		level.add(this);
		this.stats.movement = 250;
		this.gotoAndPlay("initial", done);

	});

	this.queue_(function(done) {
		this.gotoAndPlay("travel", done);
                //console.log("Now log targetX" + this.targetX);
		this.moveTo_(this.targetX, this.targetY, createjs.Ease.quartIn, done);
	});

	this.queue_(function(done) {
		console.log("Pyroblast explode!");
                this.sprite.setTransform(this.sprite.x , this.sprite.y, 2, 3);
		this.gotoAndPlay("explode", done);
	});
	this.queue_(function(done) {
		console.log("Remove Pyroblast");
                this.dealDamage();
		var level = this.world.activeLevel;
		level.remove(this);
                
                //done is from Pyroblast's queue
                done();
                //onComplete is from Caster's queue
                onComplete();
	});
	this.triggerAction();
        
        return function(){}.bind(this);
};

module.exports = Pyroblast;