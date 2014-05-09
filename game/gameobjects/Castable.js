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
};

util.inherits(Castable, BoardObject);


Castable.prototype.calTarget = function(){
    // require override in child class.
    /**
     Done class:
        Fireball - 
        Firepillar - args check, bound check, register on board
        Thunderbolt
        
     */
    
};

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
        throw new Error("Y U no enough mp!Caster MP: "+caster.mp+" Spell cost:"+this.cost);
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