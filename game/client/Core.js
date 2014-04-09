/**
 * Game Core
 */
var util = require('../framework/Util');
var jQuery = require('../vendor/jquery');
// connection
var GameObjectManager = require('../framework/GameObjectManager');

var ScriptSevice = require('../contents/services/ScriptService');
// var Connection = require('../framework/net/client/AbstractConnection');

// modules
// var HelloWorldModule = require('../modules/helloworld/client/module');
// var AuthModule = require('../modules/auth/client/module');
// var GameModule = require('../modules/game/client/module');

/**
 * Game Core
 * 
 * @constructor
 * @this {Core}
 * @param opts
 */
var Core = function(opts) {

	if (Core.instance === null) {
		Core.instance = this;
	} else {
		throw Error('Singeton Pattern Error');
	}

	var game = this;
	this.opts = Core.extend({

	}, opts);

	Core.opts = this.opts;

	this.assets;
	this.services = [];
	this.gameobjects = new GameObjectManager(); // global gameobject

	this.canvas = opts.canvas;
	console.log(opts);
	this.stage = new createjs.Stage(opts.canvasId);

	// resize options (Full-screen size)
	if (opts.width == this.opts.width && opts.height == this.opts.height
			|| (!opts.width && !opts.height)) {
		this.opts.resize = true;
		console.log("resize handler : on");
		window.addEventListener('resize', function() {
			game.onWindowResize();
		}, false);
	}

	this.initialized = false;

	this.active = false;

	this.modules = [];
	this.levels = {

	};

	this.activeLevel = false;
	this.ratio;
	this.time = Date.now();
	this.active = false;
};

Core.instance = null;
Core.opts = {};

Core.prototype.ready = function(func) {
	window.addEventListener("load", function load(event) {
		window.removeEventListener("load", load, false);
		func();
	}, false);
};
Core.extend = jQuery.extend;

/**
 * Game Core initialize
 * 
 * @this {Core}
 * @param callback
 */
Core.prototype.initialize = function(callback) {
	// Core.super_.prototype.initialize.call(this);
	// this.overlay = new Overlay();
	// initialize connection to game server (default:same domain as the client
	// side) ,port 7777
	/*
	 * this.connection = new Connection({ address : 'ws://' + document.domain +
	 * ':7777' });
	 */
	// define all modules here
	// this.modules['hello-world'] = new HelloWorldModule(this);
	// this.modules[AuthModule.NAME] = new AuthModule(this);
	// this.modules[RoomModule.NAME] = new RoomModule(this);
	// this.modules[GameModule.NAME] = new GameModule(this);
	// end
	// preloader
	this.onWindowResize();
	this.levels['demo'] = require('../contents/levels/demoLevel');
	var assets = [ {
		src : "assets/gameobjects/characters/m_mage.png",
		id : "m_mage"
	}, {
		src : "assets/gameobjects/mobs/bori.png",
		id : "bori"
	}, {
		src : "assets/gameobjects/board.png",
		id : "board"
	}, {
		src : "assets/gameobjects/magic/fireball.png",
		id : "fireball"
	}, {
		src : "assets/gameobjects/magic/l_wall.png",
		id : "lightwall"
	}, {
		src : "assets/gameobjects/magic/metor.png",
		id : "metor"
	}, {
		src : "assets/gameobjects/magic/pyroblast.png",
		id : "pyroblast"
	}, {
		src : "assets/gameobjects/magic/firepillar.png",
		id : "firepillar"
	}, {
		src : "assets/gameobjects/magic/thunderbolt.png",
		id : "thunderbolt"
	} ];

	this.services[ScriptSevice.NAME] = new ScriptSevice(this);

	this.assets = new createjs.LoadQueue(false);

	var game = this;
	this.assets.addEventListener("complete", function() {
		console.log('Assets load complete');
		game.initialized = true;
		document.getElementById("loader").className = "";
		createjs.Ticker.timingMode = createjs.Ticker.RAF;
		createjs.Ticker.addEventListener("tick", function(event) {
			game.render(event);
		});
		if (callback) {
			callback(game);
			game.render(event);
		}

	});
	this.assets.loadManifest(assets);

	// start connection
	// this.connection.connect();
	// this.initialized = true;
	return this;
};

Core.prototype.setLevel = function(level) {
	if (this.activeLevel) {
		this.activeLevel.dispose();
		delete this.activeLevel;
	}

	this.activeLevel = new this.levels[level](this);
	this.activeLevel.initialize();

}
/**
 * Game Core render
 * 
 * @this {Core}
 */
Core.prototype.render = function(event) {
	var delta = event.delta / 1000;
	this.stage.update(event);
	this.gameobjects.render(event);
}

Core.prototype.onWindowResize = function() {
	console.log("resize");
	var h = window.innerHeight;
	var w = window.innerWidth;
	var h_ratio = 727 / h;
	var w_ratio = 1440 / w;

	this.ratio = h_ratio >= w_ratio ? h_ratio : w_ratio;

	if (this.stage) {
		this.stage.setTransform(0, 0, 1 / this.ratio, 1 / this.ratio);
	}

	this.canvas.width = 1440 / this.ratio;
	this.canvas.height = 727 / this.ratio;
}
module.exports = Core;