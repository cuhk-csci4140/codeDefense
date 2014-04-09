var util = require('util');
var Castable = require('../../gameobjects/Castable');

/**
 * Gain Quickness (50% speed up in spells and actions)
 * 
 * @returns
 */
var Haste = function(world) {
	Haste.super_.call(this,world);
	this.name = "Haste";
	this.castTime = 0;
	console.log("Haste initialized");
	this.initialize();
}
util.inherits(Haste, Castable);

Haste.prototype.execute = function(caster, onComplete) {

	this.queue_(function(done) {
		caster.stats.movement = caster.defaults.movement * 0.5;
		caster.stats.castSpeed = caster.defaults.castSpeed * 0.5;
		onComplete();
	});

	this.triggerAction();
};
module.exports = Haste;