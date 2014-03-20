var util = require('util');
var BoardObject = require('./BoardObject');
var world = require('../client/Core');
var Castable = function() {
	Castable.super_.call(this, world.instance);
	this.name = "(Castable Spell)";
};

util.inherits(Castable, BoardObject);

Castable.prototype.execute = function(caster) {
	if (caster instanceof BoardObject) {
		console.log(caster + " casts " + this.name);
	} else {
		throw new Error(Caster + " is not a BoardObject");
	}
};

module.exports = Castable;