var util = require('util');
var GameObject = require('../framework/gameobjects/GameObject');

var BoardObject = function(world) {
	BoardObject.super_.call(this);
	this.world = world;
	this.position = {
		vertical : 0,
		horizontal : 0
	};
	this.defaults = {
		movement : 500,

	};
	this.stats = {
		movement : this.defaults.movement
	};

	this.boardWidth = 12;
	this.boardHeight = 6;

	this.actionQueue_ = [];
};

util.inherits(BoardObject, GameObject);

BoardObject.prototype.queue_ = function(callback) {
	this.actionQueue_.push(callback);
};

BoardObject.prototype.triggerAction = function() {
	var action = this.actionQueue_.shift();
	console.log(action);
	if (action) {
		action.call(this, this.queueOnCompleteEvent_.bind(this));
	}
};

BoardObject.prototype.queueOnCompleteEvent_ = function() {
	this.triggerAction();
};

BoardObject.prototype.move = function(h, v, equation) {
	this.queue_(function(event) {
		this.moveTo_(this.position.horizontal + h, this.position.vertical + v,
				equation, event);
	});

};
BoardObject.prototype.moveTo = function(h, v, equation) {
	this.queue_(function(event) {
		console.log("moving " + h, "," + v);
		this.moveTo_(h, v, equation, event);
	});
};
BoardObject.prototype.moveTo_ = function(h, v, equation, onCompleteEvent) {
	var self = this;
	if (equation == undefined) {
		equation = createjs.Ease.linear;
	}
	h = h > this.boardWidth - 1 ? this.boardWidth - 1 : (h > 0 ? h : 0);
	v = v > this.boardHeight - 1 ? this.boardHeight - 1 : (v > 0 ? v : 0);

	var distance = Math.sqrt(Math.pow(this.position.horizontal - h, 2)
			+ Math.pow(this.position.vertical - v, 2));

	self.onStartMoving_(event);
	var tween = createjs.Tween.get(this.sprite).to({
		x : 70 + (120 * h),
		y : 60 + (120 * v)
	}, (this.stats.movement * distance), equation).call(function(event) {
		self.onStopMoving_(event);
		self.position.vertical = v;
		self.position.horizontal = h;
		onCompleteEvent();
	})

}

BoardObject.prototype.onStartMoving_ = function() {
};
BoardObject.prototype.onStopMoving_ = function() {

};
module.exports = BoardObject;