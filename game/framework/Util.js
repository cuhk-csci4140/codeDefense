var _util = require('util');
var util = {};
/**
 * a helper class of useful functions
 */
util.ready = function(func) {
    window.addEventListener("load", function load(event) {
	window.removeEventListener("load", load, false);
	func();
    }, false);
};
util.callback = function(scope, fn) {
    return function() {
	fn.apply(scope, arguments);
    };
};
util.extend = jQuery.extend;
util = util.extend(util, _util);

module.exports = util;