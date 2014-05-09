var util = require('util');
var BoardObject = require('../../gameobjects/BoardObject');
var CombatService = require('../services/CombatService');
var Bori = function(world) {

	Bori.super_.call(this, world);
	this.setSpriteSheet(new createjs.SpriteSheet({
		"images" : [ world.assets.getResult("bori") ],
		"frames" : {
			"regX" : 52,
			"height" : 104,
			"count" : 76,
			"regY" : 74.5,
			"width" : 149
		},
		"animations" : {
			"stand" : [ 0, 5, "stand" ],
			"initRun" : [ 11, 16, "run", 6 ],
			"run" : [ 16, 22, "run", 4 ]
		}
	}));
	this.defaults.movement = 2000;
	this.stats.movement = 2000;
	this.defaultAnimation = "stand";

	this.myTurn = {};

	this.AI = function(event) {
		if (event.turn == this.faction) {
			this.myTurn = event;
			// action 1
			this.move(-1, 0);
			// action 2
			this.queue_(function(done) {
				world.services[CombatService.NAME].nextTurn(event);
				done();
			});

			// start the queue.
			this.triggerAction();
		}
	}.bind(this);
	// register to script service
	world.services[CombatService.NAME].subscribe(CombatService.Events.NextTurn,
			this.AI);

	console.log("Bori initialized");
	this.initialize();
};

util.inherits(Bori, BoardObject);

Bori.prototype.dispose = function() {
	Bori.super_.prototype.dispose.call(this);

	this.world.services[CombatService.NAME].unsubscribe(CombatService.Events.NextTurn,
			this.AI);
};
Bori.prototype.onStartMoving_ = function() {
	this.gotoAndPlay("initRun");
};

Bori.prototype.onStopMoving_ = function() {
	this.gotoAndPlay("stand");
};

// BoardObject.prototype.moveTo_ = function(h, v, equation, onCompleteEvent) {
module.exports = Bori;