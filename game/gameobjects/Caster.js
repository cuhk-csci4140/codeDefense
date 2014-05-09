var util = require('util');
var BoardObject = require('./BoardObject');
var Castable = require('./Castable');

var Caster = function(world) {
	Caster.super_.call(this, world);

};

util.inherits(Caster, BoardObject);
Caster.prototype.isCastable = function(spell) {
	if (spell instanceof Castable || spell.castable_ === true) {
		return true;
	} else {
		return false;
	}

};
Caster.prototype.cast = function(spell) {

	if (spell instanceof Castable || spell.castable_ === true) {
		spell.castable_ = false;

                /*
                 * @param onComplete is Caster's queue onCompleteCallback
                 */
		this.queue_(function(onComplete) {
			setTimeout((function() {
                                //spell has to use onComplete if   spell.execute return a onCastActionComplete Callback
				var onCastActionComplete = spell.animate(this, onComplete);
				// console.log(onCastActionComplete);

				// we pass the return callback( if we have) instead of the
				// original onComplete
				if (onCastActionComplete instanceof Function) {
					this.onCast_(onCastActionComplete);
				} else {
					this.onCast_(onComplete);
				}
				// the spell callback

			}).bind(this), this.stats.castSpeed * spell.castTime);

		});
	} else {
		throw new Error(spell + ' is not a Castable Spell');
	}

};
Caster.prototype.cast_ = function(spell, onComplete) {
	if (spell instanceof Castable || spell.castable_ === true) {
		spell.castable_ = false;

		if (!(onComplete instanceof Function)) {
			onComplete = function() {
			};
		}

		(function() {
			var onCastActionComplete = spell.execute(this, onComplete);
			// console.log(onCastActionComplete);

			// we pass the return callback( if we have) instead of the
			// original onComplete
			if (onCastActionComplete instanceof Function) {
				this.onCast_(spell,onCastActionComplete);
			} else {
				this.onCast_(spell,onComplete);
			}
			// the spell callback

		}).bind(this)();

	} else {
		throw new Error(spell + ' is not a Castable Spell');
	}

};

Caster.prototype.onCast_ = function() {

}
module.exports = Caster;