/**
 * Asset Manager
 */
var THREE = require('../vendor/Three');
var util = require('util');

var am = module.exports = function(opts) {

	this.asset = [];
};

am.prototype.addAsset = function( name , asset ){
	this.asset[ name ] = asset;
};