"use strict";
var util = require('util');

var CombatService = function(world) {
	this.world = world;

	this.reset();
};

CombatService.NAME = "service.combat";

CombatService.Events = {
	NextWave : 'combat.events.nextwave'
};

CombatService.prototype.reset = function() {
	this.waveCounter = 0;
	this.listeners_ = [];
	this.resetWave();
};

CombatService.prototype.resetWave = function() {
	this.turnCounter = 0;
	this.turnListeners_ = [];
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
	if (!this.listeners[target] instanceof Array) {
		this.listeners[target] = [];
	}

	this.turnListeners_[target].push(callback);
};

/**
 * go to next turn
 */
CombatService.prototype.nextTurn = function() {
	this.turnCounter = this.turnCounter + 1;

	if (this.turnListeners_[this.turnCounter] instanceof Array) {
		this.turnListeners_[this.turnCounter].forEach(function(target) {
			target(this);
		});
	}

	delete this.turnListeners_[this.turnCounter];
};

/**
 * CombatService event subscribe
 * 
 * @this {CombatService}
 * @param e,
 *            callback
 */
CombatService.prototype.subscribe = function(e, callback) {
	if (!this.listeners[e] instanceof Array) {
		this.listeners[e] = [];
	}

	this.listeners[e].push(callback);

};

/**
 * CombatService event dispatch
 * 
 * @this {CombatService}
 * @param object
 */
CombatService.prototype.dispatch = function(object) {
	if (this.listeners[object.event] instanceof Array) {
		this.listeners[object.event].forEach(function(target) {
			target(object);
		});
	}
}

module.exports = CombatService;