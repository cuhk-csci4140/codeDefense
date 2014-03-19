var GameObjectManager = require('../../framework/GameObjectManager');
var GameObject = require('../../framework/gameobjects/GameObject');
var AbstractLevel = function(world) {
	this.world = world;
	this.initialized = false;
	this.stage = world.stage;
	this.gameobjects = world.gameobjects;

};

AbstractLevel.prototype.newGameObject = function(className) {
	return new className(this.world);
};
AbstractLevel.prototype.add = function() {
	for (var i = 0; i < arguments.length; i++) {
		this.add_(arguments[i]);
	}

};
AbstractLevel.prototype.add_ = function(object) {
	if (object instanceof GameObject) {
		object = object.getSprite();
	} else if (typeof object == "string") {
		var temp = this.get(object);
		if (!(temp instanceof GameObject)) {
			throw new Error("gameobject:" + object
					+ " is not a instanceof GameObject");
		}
		object = temp.getSprite();
	}

	this.world.stage.addChild(object);
};
AbstractLevel.prototype.set = function(name, object) {
	if (typeof object == "function") {
		object = this.newGameObject(object);
	}

	if (object instanceof GameObject) {
		this.gameobjects.set(name, object);
		
	} else {
		throw new Error(object + " is not a instanceof GameObject");
	}
};
AbstractLevel.prototype.get = function(name) {
	return this.gameobjects.get(name);
};
AbstractLevel.prototype.initialize = function() {
	this.initialized = true;
};

AbstractLevel.prototype.update = function(event) {
	if (this.initialized) {

	}
};
AbstractLevel.prototype.dispose = function() {

};

module.exports = AbstractLevel;