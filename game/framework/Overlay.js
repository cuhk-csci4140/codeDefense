var util = require('./Util');
var $ = require('../vendor/jQuery');

/**
 * the Class to control game Overlays
 * @contructor
 * @this {Overlay}
 */

var Overlay = function() {
	this.states = [];
	this.currentState = null;
	this.add('blank', '<div id="blank" class="overlay"></div>');
	this
			.add(
					'instruction',
					'<div id="instructions" class="overlay-center"><span style="font-size:40px">Game Start</span> <p style="margin: 10px;position: absolute;right: 0px;bottom: 0px;color: #ffffff;z-index:999;"> <a href="?" style="text-decoration: none;color: #ffffff;"> EXIT GAME</a></p></div>');

};

/**
 * Add Overlay
 * @param state, html
 * @this {Overlay}
 */


Overlay.prototype.add = function(state, html) {
	this.states[state] = html;
	$('<div id="' + state + '" class="overlay">' + html + '</div>').appendTo(
			Overlay.OVERLAY_SELECTOR);
};

/**
 * chageState of Overlay
 * @param state, date
 * @this {Overlay}
 */

Overlay.prototype.changeState = function(state, data) {
	
	for ( var key in data) {
		$(Overlay.OVERLAY_SELECTOR).find('#' + state + '-' + key).text(
				data[key]);
		// console.log('key:' + key + ' value:' + data[key]);
	}
	this.visible(true);
	if (this.currentState != state) {
		console.log("change state to " + state);
		for ( var key in this.states) {
			$(Overlay.OVERLAY_SELECTOR).find('#' + key).fadeOut(200);
		}
	}
	$(Overlay.OVERLAY_SELECTOR).find('#' + state).show();//fadeIn(600);
	

	this.currentState = state;
};
/**
 * Visibility of Overlay
 * @param bool
 */
Overlay.prototype.visible = function(bool) {
	if (bool == true) {
		$(Overlay.OVERLAY_SELECTOR).show();
	} else {
		$(Overlay.OVERLAY_SELECTOR).hide();
		
	}
};

Overlay.OVERLAY_SELECTOR = "#overlay";

module.exports = Overlay;