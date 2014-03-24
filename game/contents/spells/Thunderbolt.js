var util = require('util');
var Castable = require('../../gameobjects/Castable');

Thunderbolt = function() {
	Thunderbolt.super_.call(this);
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
			"initial" : [ 0, 39, null, 5 ]
		}
	}));
	this.defaultAnimation = "initial";
	console.log("Thunderbolt initialized");
	this.initialize();
}

util.inherits(Thunderbolt, Castable);

Thunderbolt.prototype.m1 = function() {
	return this;
};

Thunderbolt.prototype.execute = function(caster) {
	console.log("Thunderbolt");
	this.sprite.setTransform(caster.sprite.x+120, caster.sprite.y-480, 1, 1);
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