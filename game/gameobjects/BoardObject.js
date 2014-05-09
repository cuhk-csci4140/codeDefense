var util = require('util');
var GameObject = require('../framework/gameobjects/GameObject');
var BoardObject = function(world) {
	BoardObject.super_.call(this);
	this.world = world;
        this.hpSprite = null;
	this.position = {
		vertical : 0,
		horizontal : 0
	};
	this.defaults = {
		movement : 500,
		castSpeed : 500,
		castRange : 2
	};

	this.stats = {
		movement : this.defaults.movement,
		castSpeed : this.defaults.castSpeed,
		castRange : this.defaults.castRange
	};

	this.boardWidth = 12;
	this.boardHeight = 6;

	this.actionQueue_ = [];
	this.actionCounter = 0;
        this.hp = 1;
};

util.inherits(BoardObject, GameObject);


BoardObject.prototype.setFaction = function(faction) {
	this.faction = faction;
}

BoardObject.prototype.setPosition = function(h, v) {
	this.world.activeLevel.gameboard[this.position.horizontal][this.position.vertical] = null;
	this.position.vertical = v;
	this.position.horizontal = h;

	this.world.activeLevel.gameboard[h][v] = this;
	this.sprite.x = 70 + (120 * h);
	this.sprite.y = 60 + (120 * v);

};
BoardObject.prototype.queue_ = function(callback) {
	this.actionQueue_.push(callback);
	return this;
};

BoardObject.prototype.triggerAction = function() {
	var action = this.actionQueue_.shift();
	// console.log(action);
	if (action) {
		this.actionCounter++;
		// pass OnCompleteCallback to next action
		action.call(this, this.queueOnCompleteEvent_.bind(this,
				this.actionCounter));
	}
};

/**
 * OnComplete Callback Templete
 * 
 * @param {type}
 *            c
 * @returns {undefined}
 */
BoardObject.prototype.queueOnCompleteEvent_ = function(c) {
	if (c == this.actionCounter) {
		this.triggerAction();
	}
};

BoardObject.prototype.move = function(h, v, equation) {
	this
			.queue_(function(event) {
				console.log("move object in game board");
				this.world.activeLevel.gameboard[this.position.horizontal][this.position.vertical] = null;
				this.world.activeLevel.gameboard[this.position.horizontal + h][this.position.vertical
						+ v] = this;
				this.moveTo_(this.position.horizontal + h,
						this.position.vertical + v, equation, event);
			});
};

BoardObject.prototype.moveTo = function(h, v, equation) {
	this
			.queue_(function(event) {
				console.log("move object in game board");
				this.world.activeLevel.gameboard[this.position.horizontal][this.position.vertical] = null;
				this.world.activeLevel.gameboard[h][v] = this;
				console.log("moving " + h, "," + v);
				this.moveTo_(h, v, equation, event);

			});
};

BoardObject.prototype.move_ = function(h, v, equation, onCompleteEvent) {
	this.moveTo_(this.position.horizontal + h, this.position.vertical + v,
			equation, onCompleteEvent);

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
		self.position.vertical = v;
		self.position.horizontal = h;
		self.onStopMoving_(event);
		if (onCompleteEvent) {
			onCompleteEvent();
		}
	})

};

BoardObject.prototype.onStartMoving_ = function() {
};
BoardObject.prototype.onStopMoving_ = function() {

};

BoardObject.prototype.gotoAndPlay = function(name, onComplete) {
	this.sprite.gotoAndPlay(name);
	if (onComplete) {
		var self = this;
		var listener = function(event) {
			if (event.name == name) {
				console.log(event);
				self.sprite.removeEventListener('animationend', listener);
				onComplete();
			}
		};
		this.sprite.addEventListener('animationend', listener);
	}
	/*
	 * if (onComplete) { setTimeout(onComplete, (this.frameCount_(name) /
	 * this.sprite.framerate) * 1000 + 200); }
	 */
}

BoardObject.prototype.frameCount_ = function(name) {
	return (this.spriteSheet._data[name].length / this.spriteSheet._data[name].speed)
			+ (this.spriteSheet._data[name].next && name != this.spriteSheet._data[name].next) ? this
			.frameCount_(this.spriteSheet._data[name].next)
			: 0;
}
module.exports = BoardObject;