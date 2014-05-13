var util = require('util');
var GameObject = require('../framework/gameobjects/GameObject');
var BoardObject = function(world) {
	BoardObject.super_.call(this);
        this.padX = 70;
        this.padY = 65;
	this.world = world;
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

	this.actionQueueEmpty = true;
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
	this.sprite.x = this.padX + (120 * h);
	this.sprite.y = this.padY + (120 * v);
        
        this.setPositionExtra(h,v);

};

BoardObject.prototype.setPositionExtra = function(h,v){//if any extra thing want to do when setPosition, eg HP Bar position
    
}

BoardObject.prototype.queue_ = function(callback) {
	this.actionQueue_.push(callback);
	return this;
};

BoardObject.prototype.triggerAction = function() {
	var action = this.actionQueue_.shift();
	// console.log(action);
	if (action) {
		this.actionCounter++;
		this.actionQueueEmpty = false;
		// pass OnCompleteCallback to next action
		action.call(this, this.queueOnCompleteEvent_.bind(this,
				this.actionCounter));
	} else {
		this.actionQueueEmpty = true;
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

	if ((this.position.horizontal + h) >= 0
			&& (this.position.horizontal + h) <= this.boardWidth
			&& (this.position.vertical + v) >= 0
			&& (this.position.vertical + v) <= this.boardHeight) {

		this
				.queue_(function(event) {
					console.log("move object in game board");
					this.world.activeLevel.gameboard[this.position.horizontal][this.position.vertical] = null;
					this.world.activeLevel.gameboard[this.position.horizontal
							+ h][this.position.vertical + v] = this;
					this.moveTo_(this.position.horizontal + h,
							this.position.vertical + v, equation, event);
				});
	} else {
		throw new Error("Moving to VOID");
	}

};

BoardObject.prototype.moveTo = function(h, v, equation) {

	if ((h) >= 0 && (h) <= this.boardWidth && (v) >= 0
			&& (v) <= this.boardHeight) {

		this
				.queue_(function(event) {
					console.log("move object in game board");
					this.world.activeLevel.gameboard[this.position.horizontal][this.position.vertical] = null;
					this.world.activeLevel.gameboard[h][v] = this;
					console.log("moving " + h, "," + v);
					this.moveTo_(h, v, equation, event);

				});

	} else {
		throw new Error("Moving to VOID");
	}
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
		x : this.padX + (120 * h),
		y : this.padY + (120 * v)
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
        
        return function(){}.bind(this);
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

BoardObject.prototype.dispose = function() {
	if ((this.position.horizontal < this.boardWidth)
			&& (this.position.vertical < this.boardHeight)) {
		this.world.activeLevel.gameboard[this.position.horizontal][this.position.vertical] = null;
	}
};

module.exports = BoardObject;