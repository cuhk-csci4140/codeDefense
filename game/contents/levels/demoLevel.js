var util = require('util');
var AbstractLevel = require('./AbstractLevel');
var Mage = require('../../gameobjects/TestPlayer');
var Bori = require('../mobs/Bori');

var demoLevel = function(world) {
	demoLevel.super_.call(this, world);
};

util.inherits(demoLevel, AbstractLevel);

demoLevel.prototype.initialize = function() {

	this.initialized = true;

	this.set('player', Mage);
	this.get('player').sprite.setTransform(70, 60, 0.6, 0.6);
	this.get('player').setPosition(0, 0);

	var ground = new createjs.Shape();
	ground.graphics.beginBitmapFill(this.world.assets.getResult("board"),
			"no-repeat").drawRect(0, 0, 1440, 727);
	// ground.cache(0, 0, 1440, 727, 1 / world.ratio);

	this.add(ground, this.get('player'));

	for (var i = 6; i <= 11; i++) {
		this.set('bori' + i, Bori);
		this.get('bori' + i).sprite.setTransform(70 + 120 * i, 60*(i-6), -0.6, 0.6);
		this.get('bori' + i).setPosition(i, i -6);
		this.add(this.get('bori' + i));
	}
	this.initialized = true;
};

demoLevel.prototype.update = function(event) {
	if (this.initialized) {

	}
};
demoLevel.prototype.dispose = function() {

};

module.exports = demoLevel;