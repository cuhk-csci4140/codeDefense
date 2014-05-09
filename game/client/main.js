/**
 * Main File
 * 
 * @constructor
 */
var jQuery = require('../vendor/jquery');
var Core = require('./Core');
var ScriptService = require('../contents/services/ScriptService');
jQuery(function() {
	game = new Core({
		canvas : document.querySelector("#game-canvas"),
		canvasId : "game-canvas"
	});
	game.initialize(function(game) {

		$('#game-cast-trigger').click(
				function(e) {
					editor.save();
			//		console.log(e.currentTarget);
				//	$(this).addClass('disabled');
					game.services[ScriptService.NAME].runScript(document
							.querySelector('#txtcodepanel').value);
				})

		console.log('game initialized');
		game.setLevel("demo");
	});
});
