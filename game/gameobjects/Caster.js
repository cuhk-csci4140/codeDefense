var util = require('util');
var BoardObject = require('./BoardObject');
var Castable = require('./Castable');

var Caster = function(world) {
	Caster.super_.call(this, world);
};

util.inherits(Caster, BoardObject);

Caster.prototype.cast = function(spell) {
	if (spell instanceof Castable) {
		spell.execute(this);
	} else {
		throw new Error(spell + ' is not a Castable Spell');
	}

};

module.exports = Caster;