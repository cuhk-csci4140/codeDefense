var util = require('util');
var Castable = require('../../gameobjects/Castable');

var Pyroblast = function() {
	Pyroblast.super_.call(this);
	this.name = "Pyroblast";
	this.setSpriteSheet(new createjs.SpriteSheet({
		"images" : [ this.world.assets.getResult("pyroblast") ],
		"frames" : {
			"regX" : 80,
			"height" : 160,
			"count" : 24,
			"regY" : 160,
			"width" : 320
		},
		"animations" : {
			"initial" : [ 0, 4, "travel", 2 ],
			"travel" : [ 5, 14, "travel", 2 ],
			"explosion" : [ 15, 19, "end", 4 ],
			"end" : [ 20, 24, null, 4 ]
		}
	}));
	this.defaultAnimation = "initial";
	console.log("Pyroblast initialized");
	this.initialize();
}

util.inherits(Pyroblast, Castable);

Pyroblast.prototype.execute = function(caster) {
	console.log("Pyroblast");
	this.sprite.setTransform(caster.sprite.x, caster.sprite.y + 70, 1, 1);
	this.position.vertical = (caster.position.vertical + 1);
	this.position.horizontal = caster.position.horizontal;
	var level = this.world.activeLevel;
	level.add(this);
	this.gotoAndPlay("initial");
	// done();
	// var tween = createjs.Tween.get(this).to({x:caster.boardWidth,
	// y:caster.y}, (600 * distance) , createjs.Ease.linear);
	// explosion remember to transform
};
module.exports = Pyroblast;