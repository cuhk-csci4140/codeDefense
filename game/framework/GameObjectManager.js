/**
 * GameObject Manager
 */
//var THREE = require('../vendor/Three');
var util = require('util');
var GameObject = require('./gameobjects/GameObject');

/**
 * GameObject Manager
 * 
 * @contructor
 * @this {GameObjectManager}
 * @param opts
 */
var GameObjectManager = function(opts) {

	this.objects = [];
	this.names = [];
	this.count = 0;
};

/**
 * Push GameObject
 * 
 * @this {GameObjectManager}
 * @param objects
 */
GameObjectManager.prototype.push = function(objects) {
	/*
	 * if (!objects instanceof GameObject) { throw Error('Error on adding an
	 * invalid GameObject'); }
	 */
	this.objects.push(objects);
	this.names.push('unnamed-' + this.count);
	this.count++;
};
/**
 * Add GameObject
 * 
 * @this {GameObjectManager}
 * @param name,
 *            objects
 */
GameObjectManager.prototype.add = function(name, objects) {
	/*
	 * if (!objects instanceof GameObject) { throw Error('Error on adding an
	 * invalid GameObject'); }
	 */
	this.objects.push(objects);
	this.names.push(name);
	this.count++;
};

/**
 * set GameObject (Replace)
 * 
 * @this {GameObjectManager}
 * @param name,
 *            objects
 */
GameObjectManager.prototype.set = function(name, objects) {

	return this.objects[this.names.indexOf(name)] = objects;
};

/**
 * Get GameObject
 * 
 * @this {GameObjectManager}
 * @param name
 * @return {objects} this objects
 */
GameObjectManager.prototype.get = function(name) {

	return this.objects[this.names.indexOf(name)];
};

/**
 * Render GameObject
 * 
 * @this {GameObjectManager}
 * @param dt
 * @return {GameObjectManager} this
 */
GameObjectManager.prototype.render = function(event) {
	this.objects.forEach(function(object) {
		if (object != undefined && object.update != null)
			object.update(event);
	});
	return this;
};

/**
 * dispose GameObject
 * 
 * @this {GameObjectManager}
 * @param dt
 * @return {GameObjectManager} this
 */

GameObjectManager.prototype.dispose = function(dt) {
	this.objects.forEach(function(object) {
		if (object != undefined && object.update != null)
			object.dispose();
	});

	// TODO dispose object
	return this;
};

module.exports = GameObjectManager;
