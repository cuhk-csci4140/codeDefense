var util = require('util');
var BoardObject = require('./BoardObject');
var core = require('../client/Core');
var Castable = function(world) {
	console.log(core);
	Castable.super_.call(this, world);
	this.name = "(Castable Spell)";
	this.castTime = 1;
};

util.inherits(Castable, BoardObject);

Castable.prototype.execute = function(caster, onComplete) {
	if (caster instanceof BoardObject) {
		console.log(caster + " casts " + this.name);
		onComplete();
	} else {
		throw new Error(Caster + " is not a BoardObject");
	}
};
Castable.DummyCastable = function() {

};
module.exports = Castable;