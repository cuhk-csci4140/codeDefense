var util = require('util');
var GameObject = require('../framework/gameobjects/GameObject');

var BoardObject = function(world) {
	BoardObject.super_.call(this);
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
};

util.inherits(BoardObject, GameObject);

BoardObject.prototype.move = function(h, v) {
	this.moveTo(this.position.horizontal + h, this.position.vertical + v);
};

BoardObject.prototype.moveTo = function(h, v) {
	var self = this;

	h = h > this.boardWidth - 1 ? this.boardWidth - 1 : (h > 0 ? h : 0);
	v = v > this.boardHeight - 1 ? this.boardHeight - 1 : (v > 0 ? v : 0);

	var distance = Math.sqrt(Math.pow(this.position.horizontal - h, 2)
			+ Math.pow(this.position.vertical - v, 2));

	var tween = createjs.Tween.get(this.sprite).to({
		x : 70 + (120 * h),
		y : 60 + (120 * v)
	}, (this.stats.movement * distance), createjs.Ease.linear).call(
			function(event) {
				self.onStopMoving_(event);
				self.position.vertical = v;
				self.position.horizontal = h;
			});

}

BoardObject.prototype.onStartMoving_ = function() {

};
BoardObject.prototype.onStopMoving_ = function() {

};
module.exports = BoardObject;