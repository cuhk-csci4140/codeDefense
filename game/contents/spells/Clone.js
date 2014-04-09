var util = require('util');
var Castable = require('../../gameobjects/Castable');
var ScriptService = require('../services/ScriptService');
var _extend = function(origin, add) {
	// Don't do anything if add isn't an object
	if (!add || typeof add !== 'object')
		return origin;

	var keys = Object.keys(add);
	var i = keys.length;
	while (i--) {
		origin[keys[i]] = add[keys[i]];
	}
	return origin;
};

var Clone = function(world, args) {
	Clone.super_.call(this, world);

	this.name = "Clone";
	this.castTime = 0.5;
	console.log("Clone initialized");
	this.args = args;

	this.initialize();
}
util.inherits(Clone, Castable);

Clone.exposeMethods = [];

Clone.prototype.execute = function(caster, onComplete) {

	if (this.args.length == 1) {
		if (this.args[0] instanceof Castable || this.args[0].castable_ === true) {
			console.log("not yet implemented");
		}
	} else {
		var spell = new args[0]();

		// this.args[1].apply({}, [ spell ]);
		// caster.execute()
	}
	onComplete();
};
throw Error('not yet implemented');
module.exports = Clone;