var util = require('util');
var AbstractLevel = require('./AbstractLevel');
var Mage = require('../../gameobjects/TestPlayer');
var Bori = require('../mobs/Bori');
var CombatService = require('../services/CombatService');

var testLevel = function(world) {
	testLevel.super_.call(this, world);
};

util.inherits(testLevel, AbstractLevel);

testLevel.prototype.initialize = function() {

	this.initialized = true;

	this.set('player', Mage);
	this.get('player').sprite.setTransform(70, 60, 0.6, 0.6);
	this.get('player').setPosition(5, 3);
	this.get('player').setFaction(CombatService.TurnAlly);

	var ground = new createjs.Shape();
	ground.graphics.beginBitmapFill(this.world.assets.getResult("board"),
			"no-repeat").drawRect(0, 0, 1440, 727);
	// ground.cache(0, 0, 1440, 727, 1 / world.ratio);

	this.add(ground, this.get('player'));

	for (var i = 1; i <= 6; i++) {
		this.set('bori' + i, Bori);
		this.get('bori' + i).sprite.setTransform(0, 0, -0.6, 0.6);
		var x;
		do {
			x = [ 3 + Math.ceil(Math.random() * 9) - 1,
					Math.ceil(Math.random() * 6) - 1 ];
		} while ( (x[0] == 5 && x[1] == 3));
		console.log(x);

		this.get('bori' + i).setPosition(x[0], x[1]);
		this.get('bori' + i).setFaction(CombatService.TurnEnemy);
		this.add(this.get('bori' + i));
	}
	this.initialized = true;
};

testLevel.prototype.update = function(event) {
	if (this.initialized) {

	}
};
testLevel.prototype.dispose = function() {

};

module.exports = testLevel;