var util = require('util');
var Castable = require('../../gameobjects/Castable');

Lightwall = function() {
	Lightwall.super_.call(this);
	this.name = "Lightwall";
	this.setSpriteSheet(new createjs.SpriteSheet({
		"images" : [ this.world.assets.getResult("lightwall") ],
		"frames" : {
			"regX" : 98,
			"height" : 196,
			"count" : 27,
			"regY" : 96,
			"width" : 192
		},
		"animations" : {
			"initial" : [ 0, 7, "active", 2 ],
			"active" : [ 8, 18, "active", 4 ],
			"end" : [ 19, 27 , 2]
		}
	}));
	this.defaultAnimation = "initial";
	this.castTime = 1;
	console.log("Lightwall initialized");
	this.initialize();
}

util.inherits(Lightwall, Castable);

Lightwall.prototype.execute = function(caster, onComplete) {
	this.queue_(function(done) {
		console.log("lightwall");
		this.sprite.setTransform(caster.sprite.x + 120, caster.sprite.y - 20,
				0.8, 0.8);
		this.position.vertical = (caster.position.vertical + 1);
		this.position.horizontal = caster.position.horizontal;
		var level = this.world.activeLevel;
		level.add(this);
		this.gotoAndPlay("initial");
		done();
	
	});
	this.triggerAction();
	// var tween = createjs.Tween.get(this).to({x:caster.boardWidth,
	// y:caster.y}, (600 * distance) , createjs.Ease.linear);

};