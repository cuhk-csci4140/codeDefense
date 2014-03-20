/**
 * Object inside the game world to represent anything inside the game world.
 * 
 * @constructor
 * @this {GameObject}
 * @param {geometry,
 *            material}
 */
// var THREE = require('../../vendor/Three');
var util = require('util');

var GameObject = function() {
	this.spriteSheet = null;
	this.sprite = null;
	this.defaultAnimation = "default";
	this.framerate = 2;
};
// util.inherits(GameObject , THREE.Mesh);
GameObject.prototype.initialize = function() {
	this.sprite = new createjs.Sprite(this.spriteSheet, this.defaultAnimation);
	this.sprite.framerate = this.framerate;
};

GameObject.prototype.setSpriteSheet = function(ss) {
	this.spriteSheet = ss;
};

GameObject.prototype.getSprite = function() {
	return this.sprite;
};

GameObject.prototype.gotoAndPlay = function(name){
	return this.sprite.gotoAndPlay(name);
}

/**
 * Update game object
 */
// loop code goes here
GameObject.prototype.update = function(event) {
	return false;
};

/**
 * Dispose game object
 */
GameObject.prototype.dispose = function() {
	return false;
};

module.exports = GameObject;
