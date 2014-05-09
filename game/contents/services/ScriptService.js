"use strict";
var util = require('util');
var Castable = require('../../gameobjects/Castable');
/*
 * var Fireball = require('../contents/spells/Fireball'); var Firepillar =
 * require('../contents/spells/Firepillar'); var Haste =
 * require('../contents/spells/Haste'); var Lightwall =
 * require('../contents/spells/Lightwall'); var Pyroblast =
 * require('../contents/spells/Pyroblast'); var Thunderbolt =
 * require('../contents/spells/Thunderbolt');
 */
var ScriptService = function(world) {
	this.world = world;
	this.context = window;
	this.callback = function() {
		console.log("[" + ScriptService.NAME + "] default callback");
	};

	this.scripts = {
		Fireball : require('../spells/Fireball'),
		Firepillar : require('../spells/Firepillar'),
		Haste : require('../spells/Haste'),
		Lightwall : require('../spells/Lightwall'),
		Pyroblast : require('../spells/Pyroblast'),
		Thunderbolt : require('../spells/Thunderbolt'),
		Teleport : require('../spells/Teleport')
	};

};
ScriptService.prototype.setContext = function(context) {
	this.context = context;
};

ScriptService.prototype.setCallback = function(func) {
	this.callback = func;
};

ScriptService.prototype.runScript = function(script) {
	// script = "this.cast(new spells.Fireball());";

	var world = this.world;

	// spells
	var spells = {

	};

	var context = this.context;

	// context
	var thisObj = {
		move : function() {
			return context.move.apply(context, arguments);
		},
		moveTo : function() {
			return context.moveTo.apply(context, arguments);
		},
		cast : function() {
			if (arguments.length == 1 && context.isCastable) {
				var s_ = arguments[0];
				if (!context.isCastable(s_) && s_ instanceof Function) {
					var s_ = s_();
				}

				if (context.isCastable(s_)) {
					context.cast.apply(context, [ s_ ]);
				} else {
					throw Error("not castable skill.");
				}
			}

			return thisObj;
		}
	};

	for ( var name in this.scripts) {
		spells[name] = (function(n) {
			var target = this.scripts[n];

			return function() {
				//
				var real = new target(world, arguments);
				var casted = false;
				var methods = {
					execute : function(caster, onComplete) {
						if (casted) {
							console
									.log("You can not execute this skill again.");
							return;
						}
						casted = true;
						return real.execute(caster, onComplete);
					},
					castable_ : true
				};

				if (target.exposeMethods instanceof Array) {
					target.exposeMethods.forEach(function(m) {
						methods[m] = function() {
							real[m].apply(real, arguments);
						};
					});
				}
				return methods;
			};

		}).call(this, name);

		// util.inherits(spells[name], Castable.DummyCastable);
		console.log("skill registered: " + name);
	}

	var result = this.runScript_(script, thisObj, spells);
	// exception
	if (result.exception instanceof Error) {
		console.log("[" + ScriptService.NAME + "} error : " + result.exception);
		showBox('Oops! Cast Error.', result.exception);
        
	}

	if (this.callback instanceof Function) {
		this.callback({
			status : !(result.exception instanceof Error),
			error : result.exception,
			result : result.result,
			service : this
		});
	}

	console.log("ScriptService Result:")
	console.log(result);
};

ScriptService.prototype.runScript_ = function(script, context, spells) {
	var exception = false;

	var result = (function(spells, console, window, document, XMLHttpRequest,
			$, jQuery, util, ScriptService, game, world, Castable, JSON , showBox) {
		try {
			eval(script);
		} catch (e) {
			exception = e;
		}
	}).apply(context, [ spells, {
		log : function() {

		}
	}, {}, {}, false, false, false, false, false, false, false, false, false , showBox]);

	return {
		'result' : result,
		'exception' : exception
	};
}
ScriptService.NAME = "service.scripting";

module.exports = ScriptService;