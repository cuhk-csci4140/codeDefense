var util = require('util');
var Castable = require('./Castable');

var ShootingSpell = function(world) {
	console.log("Initialize a shooting spell");
	ShootingSpell.super_.call(this, world);
        //this.calTarget();
};

util.inherits(ShootingSpell, Castable);

ShootingSpell.prototype.execute = function(caster, onComplete) {
    this.calTarget(caster);
    
    //if doesn't return a function , skill execution is independent of caster turn.
   return this.shoot(caster, onComplete);    
};

ShootingSpell.prototype.shoot = function(caster, onComplete){
    //override this one, and the real stuff put here
};

ShootingSpell.prototype.calTarget = function(caster) {
        console.log(this.name + " calculating target");
	// get back the gameBoard
	var gameBoard = this.world.activeLevel.gameboard;
	// Fireball is horizontal shooting
	// get the first hit target in same horizontal
	var vertical = caster.position.vertical;
	var horizontal;
	var target;
	for (horizontal = (caster.position.horizontal + 1); horizontal < 12; horizontal++) {
		if ((target = gameBoard[horizontal][vertical]) != null) {
			break;
		}
	}
	this.targetX = horizontal;
	this.targetY = vertical;
};

module.exports = ShootingSpell;

