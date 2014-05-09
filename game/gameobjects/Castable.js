var util = require('util');
var BoardObject = require('./BoardObject');
var core = require('../client/Core');
var Castable = function(world) {
    console.log(core);
    Castable.super_.call(this, world);
    this.name = "(Castable Spell)";
    this.castTime = 1;
    // require calculation of target
    this.targetX = null;
    this.targetY = null;
    this.target = [];
};

util.inherits(Castable, BoardObject);


Castable.prototype.calTarget = function() {
    // require override in child class.
    /*
     Done class:
     Fireball    - OK, calTarget put list of enemy
     Firepillar  - OK, args check, bound check, register on board,  TODO: remember to add checking in enemy move
     Thunderbolt - OK,                                              TODO: calTarget
     Lightwall   - OK                                               TODO: remember to add checking in enemy move
     
     */

};

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