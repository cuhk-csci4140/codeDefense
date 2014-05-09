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
	this.aoe = false;
	this.range = 0;
};

util.inherits(Castable, BoardObject);

Castable.prototype.calTarget = function() {
	// require override in child class.
	/*
	 * Done class: Fireball - OK, calTarget put list of enemy Firepillar - OK,
	 * args check, bound check, register on board, TODO: remember to add
	 * checking in enemy move Thunderbolt - OK, TODO: calTarget Lightwall - OK
	 * TODO: remember to add checking in enemy move
	 * 
	 */

};

Castable.prototype.dealDamage = function() {
	console.log("----------deal damage to target-------");
	console.log(this.target.length);
	for (var i = 0; i < this.target.length; i++) {
		var current = this.target[i];
		console.log(current);
		current.hp -= this.damage;
                if (current.hp > 0 ){
                    var scale = (current.hp / current.originHp);
                    current.hpBar.graphics.clear();
                    current.hpBar.graphics.beginFill("#ff0000").drawRect(0, 0, (100 * scale), 10);  
                }
		else {
                    this.world.activeLevel.remove(current);
		}
	}
}

// animate the spell on the real world!
Castable.prototype.animate = function(caster, onComplete) {
	if (caster.mp >= this.cost) {
		caster.mp -= this.cost;
		// initial the position
		this.position.vertical = caster.position.vertical;
		this.position.horizontal = caster.position.horizontal;
		// call the execute function
		return this.execute(caster, onComplete);
	} else {
		throw new Error("Y U no enough mp!");
		return false;
	}
}

// would be overrided by childern
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
Castable.prototype.moveTo_ = function(h, v, equation, onCompleteEvent) {
	var self = this;
	if (equation == undefined) {
		equation = createjs.Ease.linear;
	}
	if (self instanceof Castable)
		h = h > this.boardWidth - 1 ? this.boardWidth : (h > 0 ? h : 0);
	v = v > this.boardHeight - 1 ? this.boardHeight : (v > 0 ? v : 0);

	var distance = Math.sqrt(Math.pow(this.position.horizontal - h, 2)
			+ Math.pow(this.position.vertical - v, 2));

	self.onStartMoving_(event);
	var tween = createjs.Tween.get(this.sprite).to({
		x : 70 + (120 * h),
		y : 60 + (120 * v)
	}, (this.stats.movement * distance), equation).call(function(event) {
		self.position.vertical = v;
		self.position.horizontal = h;
		self.onStopMoving_(event);
		if (onCompleteEvent) {
			onCompleteEvent();
		}
	})

};
module.exports = Castable;