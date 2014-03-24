var util = require('util');
var AbstractLevel = require('./AbstractLevel');
var Mage = require('../../gameobjects/TestPlayer');
 var Bori = require('../mobs/Bori');

var demoLevel = function(world) {
	demoLevel.super_.call(this, world);

	this.set('player', Mage);
	this.get('player').sprite.setTransform(70, 60, 0.6, 0.6);

	this.set('bori', Bori);
	this.get('bori').sprite.setTransform(70 + 120 * 6, 60, -0.6, 0.6);
	this.get('bori').setPosition(6, 0);
	var ground = new createjs.Shape();
	ground.graphics.beginBitmapFill(world.assets.getResult("board"),
			"no-repeat").drawRect(0, 0, 1440, 727);
	// ground.cache(0, 0, 1440, 727, 1 / world.ratio);
	this.add(ground, this.get('player'), this.get('bori'));
};

util.inherits(demoLevel, AbstractLevel);

demoLevel.prototype.initialize = function() {

	this.initialized = true;
};

demoLevel.prototype.update = function(event) {
	if (this.initialized) {

	}
};
demoLevel.prototype.dispose = function() {

};

module.exports = demoLevel;