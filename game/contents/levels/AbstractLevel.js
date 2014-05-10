var GameObjectManager = require('../../framework/GameObjectManager');
var GameObject = require('../../framework/gameobjects/GameObject');
var Mob = require('../mobs/Mob');
var TestPlayer = require('../../gameobjects/TestPlayer');

var AbstractLevel = function(world) {
	this.world = world;
	this.initialized = false;
	this.stage = world.stage;
	this.gameobjects = world.gameobjects;
	// gameBoard for the board, init all null;
	var array = new Array();
	for (var i = 0; i < 12; i++) {
		array[i] = new Array();
		for (var j = 0; j < 6; j++) {
			array[i][j] = null;
		}
	}
	this.gameboard = array;
};

AbstractLevel.prototype.checkBoard = function(){
    var i,j;
    for(i=0;i<12;i++){
        for(j=0;j<6;j++){
            var target = this.gameboard[i][j];
            if((target != null)&& !(target instanceof TestPlayer)){
                return false;
            }
        }
    }
    return true;
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
        var stageChild = object;
        var hpbar = null;
	if (object instanceof GameObject) {
		stageChild = object.getSprite();
                if(object instanceof Mob){
                    hpbar = object.getHPbar();
                }
	} else if (typeof object == "string") {
		var temp = this.get(object);
		if (!(temp instanceof GameObject)) {
			throw new Error("gameobject:" + object
					+ " is not a instanceof GameObject");
		}
		stageChild = temp.getSprite();
	}
        
	this.world.stage.addChild(stageChild);
        if(hpbar !== null){
            this.world.stage.addChild(hpbar);
        }
};
AbstractLevel.prototype.remove = function() {
	for (var i = 0; i < arguments.length; i++) {
		this.remove_(arguments[i]);
	}

};
AbstractLevel.prototype.remove_ = function(object) {
	var sprite;
        var hpBar;
	if (object instanceof GameObject) {
		sprite = object.getSprite();
                if(object instanceof Mob){
                    hpBar = object.getHPbar();
                }
	} else if (typeof object == "string") {
		var temp = this.get(object);
		if (!(temp instanceof GameObject)) {
			throw new Error("gameobject:" + object
					+ " is not a instanceof GameObject");
		}
		object = temp;
		sprite = temp.getSprite();
	}
	object.dispose();
	this.world.stage.removeChild(sprite);
        this.world.stage.removeChild(hpBar);
	delete object;
};
AbstractLevel.prototype.set = function(name, object) {
	if (typeof object == "function") {
		object = this.newGameObject(object);
	}

	if (object instanceof GameObject) {
		this.gameobjects.add(name, object);

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