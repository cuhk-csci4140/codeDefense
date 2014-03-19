var util = require('../../../framework/Util');
var THREE = require('../../../vendor/Three');
var GameObjectManager = require('../../../framework/GameObjectManager');
var World = require('../../../framework/World');
var FreeGameplay = require('../../../framework/gameplay/FreeGameplay');
var ColladaLoader = require('../../../vendor/loaders/ColladaLoader');
var CharacterController = require('../../../framework/controllers/CharacterController');
var THREEx = THREEx || {};
THREE.TrackballControls = require('../../../vendor/THREE/TrackballControls');
/**
 * Practice Mode is a standalone free mode. inherited from FreeGameplay
 * 
 * @constructor
 * @this {PracticeModeGameplay}
 * @param region
 *                Region
 * @param opts
 *                Options Object
 */
var PracticeModeGameplay = function(region, opts) {
	this.opts = World.extend({
		name : 'practice',
		yLevel : 40,
		debugLine : true
	}, opts);
	this.ready = false;
	PracticeModeGameplay.super_.call(this, region, this.opts);
};
util.inherits(PracticeModeGameplay, FreeGameplay);

module.exports = PracticeModeGameplay;