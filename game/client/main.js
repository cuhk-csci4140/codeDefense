/**
 * Main File
 * 
 * @constructor
 */
var jQuery = require('../vendor/jquery');
var Core = require('./Core');
jQuery(function() {
	game = new Core({
		canvas : document.querySelector("#game-canvas"),
		canvasId : "game-canvas"
	});
	game.initialize(function(game){
		
		console.log('game initialized');
		game.setLevel("demo");
	});
});
