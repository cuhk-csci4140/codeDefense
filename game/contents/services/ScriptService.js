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
		Thunderbolt : require('../spells/Thunderbolt')
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

	var exception = false;
	var world = this.world;

	var spells = {

	};

	for ( var name in this.scripts) {

		spells[name] = (function(n) {
			var target = this.scripts[n];

			return function() {
				//
				var real = new target(world);

				var methods = {
					execute : function(caster, onComplete) {
						real.execute(caster, onComplete);
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

	var result = (function(console, window, document, XMLHttpRequest, $,
			jQuery, util, ScriptService, game, world, spells) {
		try {
			eval(script);
		} catch (e) {
			exception = e;
		}
	}).apply(this.context, [ {}, {}, {}, false, false, false, util, false,
			false, false, spells ]);

	// exception
	if (exception instanceof Error) {
		console.log("[" + ScriptService.NAME + "} error : " + exception);
	}

	if (this.callback instanceof Function) {
		this.callback({
			status : !(exception instanceof Error),
			error : exception,
			result : result,
			service : this
		});
	}

	console.log("ScriptService Result:")
	console.log(result);
};

ScriptService.NAME = "service.scripting";

module.exports = ScriptService;