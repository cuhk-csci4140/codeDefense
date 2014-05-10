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

	for (var i = 1; i <= 10; i++) {
		this.set('bori' + i, Bori);
                var currentBori = this.get('bori' + i);
		currentBori.sprite.setTransform(0, 0, -0.6, 0.6);
		var x;
                var y;
		do {
			x = 3 + Math.ceil(Math.random() * 9) - 1;
			y = Math.ceil(Math.random() * 6) - 1 ;
		} while ( (x == 5 && y == 3));
		//console.log(x);

		currentBori.setPosition(x, y);
		currentBori.hpBar.setTransform( 35 + 120 * x, (120 * y) + 10,
				0.6, 0.6);                
		currentBori.setFaction(CombatService.TurnEnemy);
		this.add(currentBori);
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