"use strict";
var util = require('util');

var CombatService = function(world) {
	this.world = world;

	this.reset();
};

CombatService.NAME = "service.combat";

CombatService.TurnAlly = "combat.service.ally";
CombatService.TurnEnemy = "combat.service.enemy";

CombatService.Factions = [ CombatService.TurnAlly, CombatService.TurnEnemy ];

CombatService.Events = {
	NextWave : 'combat.events.nextwave',
	NextTurn : 'combat.events.nextturn',
	PositionChange : 'combat.events.changePosition'
};

CombatService.prototype.reset = function() {
	this.waveCounter = 0;
	this.listeners_ = [];
	this.resetWave();
};

CombatService.prototype.resetWave = function() {
	this.turnCounter = 0;
	this.turnListeners_ = [];
	this.turn = CombatService.TurnAlly;
};

CombatService.prototype.nextWave = function() {
	this.dispatch({
		event : CombatService.Events.NextWave,
		data : this.waveCounter,
		target : this
	});
};

/**
 * push a callback function after n turns.
 * 
 * @param turns
 *            no of turns later
 * @param callback
 *            function callback
 */
CombatService.prototype.callLater = function(turns, callback) {

	var target = this.turnCounter + turns;
	if (!(this.turnListeners_[target] instanceof Array)) {
		this.turnListeners_[target] = [];
	}

	console.log("[CombatService] callLater [" + turns + "] :" + callback);
	this.turnListeners_[target].push(callback);
};

/**
 * go to next turn
 */
CombatService.prototype.nextTurn = function(event) {
	if (this.turnCounter == 0
			|| (event instanceof Object && event.data == this.turnCounter)) {
		this.turnCounter = this.turnCounter + 1;

		if (this.turnListeners_[this.turnCounter] instanceof Array) {
			console.log("[CombatService] execute CallLater ["
					+ this.turnCounter + "]");
			this.turnListeners_[this.turnCounter].forEach(function(target) {
				if (target instanceof Function) {
					target(this);
				}
			});
		}

		this.turn = CombatService.Factions[(CombatService.Factions
				.indexOf(this.turn) + 1)
				% CombatService.Factions.length];

		// CombatService.Factions
		/*
		 * this.turn = this.turn == CombatService.TurnAlly ?
		 * CombatService.TurnEnemy : CombatService.TurnAlly;
		 */
		this.dispatch({
			event : CombatService.Events.NextTurn,
			turn : this.turn,
			data : this.turnCounter,
			target : this
		});

		delete this.turnListeners_[this.turnCounter];
	}
};

/**
 * CombatService event subscribe
 * 
 * @this {CombatService}
 * @param e,
 *            callback
 */
CombatService.prototype.subscribe = function(e, callback) {
	if (!(this.listeners_[e] instanceof Array)) {
		this.listeners_[e] = [];
	}

	this.listeners_[e].push(callback);
};

/**
 * CombatService event unsubscribe
 * 
 * @this {CombatService}
 * @param e,
 *            callback
 */
CombatService.prototype.unsubscribe = function(e, callback) {
	console.log("[CombatService] unsubscribe " + e + " : " + callback);
	if (!(this.listeners_[e] instanceof Array)) {
		return false;
	}
	if (this.listeners_[e] instanceof Array) {
		var len = this.listeners_[e].length;
		this.listeners_[e] = this.listeners_[e].filter(function(x) {
			return x != callback
		});
		return len > this.listeners_[e].length;
	}

};

/**
 * CombatService event dispatch
 * 
 * @this {CombatService}
 * @param object
 */
CombatService.prototype.dispatch = function(object) {
	if (this.listeners_[object.event] instanceof Array) {
		this.listeners_[object.event].forEach(function(target) {
			target(object);
		});
	}
}

module.exports = CombatService;