var util = require('util');
var Castable = require('../../gameobjects/Castable');
var Mob = require('../mobs/Mob');
var Thunderbolt = function(world, args) {
	Thunderbolt.super_.call(this, world);
	this.name = "Thunderbolt";
	this.setSpriteSheet(new createjs.SpriteSheet({
		"images" : [ this.world.assets.getResult("thunderbolt") ],
		"frames" : {
			"regX" : 160,
			"height" : 560,
			"count" : 39,
			"regY" : 0,
			"width" : 320
		},
		"animations" : {
			"initial" : [ 0, 39, null, 10 ]
		}
	}));
	this.defaultAnimation = "initial";
	this.args = args;
	this.castTime = 5;
	this.damage = 5;
	this.cost = 15;
	console.log("Thunderbolt initialized");
	this.initialize();
}

util.inherits(Thunderbolt, Castable);

Thunderbolt.prototype.execute = function(caster, onComplete) {
	return (function() {
		this.queue_(function(done) {
			console.log("Thunderbolt cast");
			// calculate target
			this.calTarget(caster);
			var distX = this.targetX - caster.position.horizontal;
			var distY = this.targetY - caster.position.vertical;
			this.sprite.setTransform(caster.sprite.x + (120 * distX),
					caster.sprite.y - 480 + (120 * distY), 1, 1);
			this.position.vertical = this.targetY;
			this.position.horizontal = this.targetX;
			var level = this.world.activeLevel;
			level.add(this);
			this.gotoAndPlay("initial", done);

		});
		this.queue_(function(done) {
			this.dealDamage();
			console.log("Thunderbolt cast finish");
			var level = this.world.activeLevel;
			level.remove(this);
			onComplete();
		});
		this.triggerAction();
	}).bind(this);
};

Thunderbolt.prototype.calTarget = function(caster) {
	console.log(this.name + " calculating target");
	var gameBoard = this.world.activeLevel.gameboard;
	var distX = parseInt(this.args[0]);
	var distY = parseInt(this.args[1]);
	// do the range limit
	this.targetX = caster.position.horizontal;
	this.targetY = caster.position.vertical;
	if ((Math.abs(distX) >= 0 && Math.abs(distX) <= caster.stats.castRange)
			&& (Math.abs(distY) >= 0 && Math.abs(distY) <= caster.stats.castRange)) {
		this.targetX = caster.position.horizontal + distX;
		this.targetY = caster.position.vertical + distY;
		this.targetX = this.targetX >= 0 ? this.targetX : 0;
		this.targetY = this.targetY >= 0 ? this.targetY : 0;
		if (gameBoard[this.targetX][this.targetY] instanceof Mob) {
			this.target.push(gameBoard[this.targetX][this.targetY]);
		}
	} else if (this.targetX > 12 || this.targetY > 6) {
		showBox("Oops!", "Spells casted in VOID!");
	} else {
		showBox("Oops!", "Cast Distance too long");
	}

};
module.exports = Thunderbolt;