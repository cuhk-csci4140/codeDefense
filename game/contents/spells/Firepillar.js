var util = require('util');
var Castable = require('../../gameobjects/Castable');

var Firepillar = function(world) {
	Firepillar.super_.call(this,world);
	this.name = "Firepillar";
	this.setSpriteSheet(new createjs.SpriteSheet({
		"images" : [ this.world.assets.getResult("firepillar") ],
		"frames" : {
			"regX" : 48,
			"height" : 176,
			"count" : 27,
			"regY" : 0,
			"width" : 96
		},
		"animations" : {
			"initial" : [ 0, 6, "active", 2 ],
			"active" : [ 7, 20, "active", 4 ],
			"end" : [ 21, 27, null, 2 ]
		}
	}));
	this.defaultAnimation = "initial";
	console.log("Firepillar initialized");
	this.initialize();
}

util.inherits(Firepillar, Castable);


Firepillar.prototype.execute = function(caster) {
	console.log("Firepillar");
	this.sprite.setTransform(caster.sprite.x+120, caster.sprite.y-120, 1, 1);
	this.position.vertical = caster.position.vertical;
	this.position.horizontal = (caster.position.horizontal+1);
	var level = this.world.activeLevel;
	level.add(this);
	this.gotoAndPlay("initial");
	// done();
	// var tween = createjs.Tween.get(this).to({x:caster.boardWidth,
	// y:caster.y}, (600 * distance) , createjs.Ease.linear);
	// explosion remember to transform
};

module.exports = Firepillar;