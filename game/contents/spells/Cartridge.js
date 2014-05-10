var util = require('util');
var ShootingSpell = require('../../gameobjects/ShootingSpell');
var Caster = require('../../gameobjects/Caster');

/**
 
Cast four Fireball in a row.
var cart = spells.Cartridge(4);
cart.load(function(){  return new spells.Fireball();   });
this.cast(cart);
 */
var Cartridge = function(world,args) {

	Cartridge.super_.call(this, world);
	this.name = "Cartridge";
	this.defaultAnimation = "initial";
	this.castTime = 0.5;
	this.cost = 15;
	this.damage = 0;
	this.args = args;
	console.log("Cartridge initialized");
	this.initialize();
}
util.inherits(Cartridge, ShootingSpell);
Cartridge.exposeMethods = [ "load" ];

/**
 * Load Cartridge
 */
Cartridge.prototype.load = function(func) {
	if (func instanceof Function) {
		this.cartridge = func;
	} else {
		throw new Error("Invalid Cartridge");
	}

};

Cartridge.prototype.shoot = function(caster, onComplete) {

	if (!caster.isCastable(this.cartridge)
			&& this.cartridge instanceof Function) {
		var size = parseInt(this.args[0]);
		size = size > 5 ? 5 : size;
		for (var i = 0; i < size; i++) {
			this.queue_(function(done) {

				var spell = this.cartridge();
				if (caster.isCastable(spell)) {
					caster.cast_(spell, done);
				}

			});
		}
	}

	this.queue_(function(done) {
		onComplete();
		done();
	});

	this.triggerAction();

	return function() {
	}.bind(this);
};

module.exports = Cartridge;