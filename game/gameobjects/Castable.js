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
        this.cost = 1;
        this.damage = 1;
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

Castable.prototype.dealDamage = function(){
    console.log("----------deal damage to target-------");
    console.log(this.target.length);
    for (var i = 0 ; i < this.target.length; i++){
        var current = this.target[i];
        console.log(current);
        current.hp -= this.damage;
        if(current.hp <= 0){
            this.world.activeLevel.remove(current);
        }
    }
}

//animate the spell on the real world!
Castable.prototype.animate = function(caster,onComplete){
    if(caster.mp >= this.cost){
        caster.mp -= this.cost;
        //initial the position 
        this.position.vertical = caster.position.vertical;
        this.position.horizontal = caster.position.horizontal;
        //call the execute function
        return this.execute(caster,onComplete);
    }
    else{
        throw new Error("Y U no enough mp!");
    }
}

//would be overrided by childern
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