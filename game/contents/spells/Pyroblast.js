var util = require('util');
var Castable = require('../../gameobjects/Castable');

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
	console.log("Pyroblast initialized");
	this.initialize();
}

util.inherits(Pyroblast, Castable);

Pyroblast.prototype.execute = function(caster) {
	/*console.log("Pyroblast");
	this.sprite.setTransform(caster.sprite.x, caster.sprite.y + 70, 1, 1);
	this.position.vertical = (caster.position.vertical + 1);
	this.position.horizontal = caster.position.horizontal;
	var level = this.world.activeLevel;
	level.add(this);
	this.gotoAndPlay("initial");
	// done();
	// var tween = createjs.Tween.get(this).to({x:caster.boardWidth,
	// y:caster.y}, (600 * distance) , createjs.Ease.linear);
	// explosion remember to transform*/
    
    	console.log("Pyroblast calculating target");
	this.queue_(function(done) {
		this.calTarget(caster);
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
		this.gotoAndPlay("explode", done);
	});
	this.queue_(function(done) {
		console.log("Remove Pyroblast");
		var level = this.world.activeLevel;
		level.remove(this);
	});
	this.triggerAction();
};

Pyroblast.prototype.calTarget = function(caster) {
	// get back the gameBoard
	var gameBoard = this.world.activeLevel.gameboard;
	// Fireball is horizontal shooting
	// get the first hit target in same horizontal
	var vertical = caster.position.vertical;
	var horizontal;
	var target;
	for (horizontal = (caster.position.horizontal + 1); horizontal < 12; horizontal++) {
		if ((target = gameBoard[horizontal][vertical]) != null) {
			break;
		}
	}
	this.targetX = horizontal;
	this.targetY = vertical;
};

module.exports = Pyroblast;