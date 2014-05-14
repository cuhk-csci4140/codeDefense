/**
 * Game Core
 */
var util = require('../framework/Util');
var jQuery = require('../vendor/jquery');
// connection
var GameObjectManager = require('../framework/GameObjectManager');

var ScriptSevice = require('../contents/services/ScriptService');

var CombatSevice = require('../contents/services/CombatService');
var Connection = require('../framework/net/client/AbstractConnection');


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
    this.opts = Core.extend({}, opts);

    Core.opts = this.opts;

    this.assets;
    this.services = [];
    this.gameobjects = new GameObjectManager(); // global gameobject
    this.score = 0;
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
    this.levels = {};

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

    this.connection = new Connection({
        address: 'ws://' + document.domain + ':7777'
    });

    // define all modules here
    // this.modules['hello-world'] = new HelloWorldModule(this);
    // this.modules[AuthModule.NAME] = new AuthModule(this);
    // this.modules[RoomModule.NAME] = new RoomModule(this);
    // this.modules[GameModule.NAME] = new GameModule(this);
    // end
    // preloader
    this.onWindowResize();
    this.levels['demo'] = require('../contents/levels/demoLevel');
    this.levels['test'] = require('../contents/levels/testLevel');
    this.levels['stage1a'] = require('../contents/levels/Stage1a');
    this.levels['stage1b'] = require('../contents/levels/Stage1b');
    this.levels['stage1c'] = require('../contents/levels/Stage1c');
    this.levels['stage1d'] = require('../contents/levels/Stage1d');
    var assets = [{
            src: "assets/gameobjects/characters/m_mage.png",
            id: "m_mage"
        }, {
            src: "assets/gameobjects/mobs/bori.png",
            id: "bori"
        }, {
            src: "assets/gameobjects/mobs/Chibi.png",
            id: "chibi"
        }, {
            src: "assets/gameobjects/mobs/tree.png",
            id: "tree"
        }, {
            src: "assets/gameobjects/mobs/usagi.png",
            id: "usagi"
        }, {
            src: "assets/gameobjects/board.png",
            id: "board"
        }, {
            src: "assets/gameobjects/magic/fireball.png",
            id: "fireball"
        }, {
            src: "assets/gameobjects/magic/l_wall.png",
            id: "lightwall"
        }, {
            src: "assets/gameobjects/magic/metor.png",
            id: "metor"
        }, {
            src: "assets/gameobjects/magic/pyroblast.png",
            id: "pyroblast"
        }, {
            src: "assets/gameobjects/magic/firepillar.png",
            id: "firepillar"
        }, {
            src: "assets/gameobjects/magic/thunderbolt.png",
            id: "thunderbolt"
        }, {
            src: "assets/gameobjects/magic/icearrow.png",
            id: "icearrow"
        }, {
            src: "assets/gameobjects/magic/SLB.png",
            id: "SLB"
        }];

    this.services[ScriptSevice.NAME] = new ScriptSevice(this);
    this.services[CombatSevice.NAME] = new CombatSevice(this);
    this.assets = new createjs.LoadQueue(false);


    //load sound here
    var assetsPath = "assets/bgm/";
    var manifest = [
        {src: "bgm01.ogg", id: 1},
        {src: "bgm02.ogg", id: 2}
    ];

    createjs.Sound.alternateExtensions = ["ogg"];	// add other extensions to try loading if the src file extension is not supported
    //createjs.Sound.addEventListener("fileload", createjs.proxy(soundLoaded, this)); // add an event listener for when load is completed
    createjs.Sound.registerManifest(manifest, assetsPath);

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
    this.connection.connect();
    // this.initialized = true;
    return this;
};

Core.prototype.setLevel = function(level) {
    var playerX = null;
    var playerY = null;
    try {
        playerX = this.gameobjects.get('player').position.horizontal;
        playerY = this.gameobjects.get('player').position.vertical;
        this.gameobjects.dispose();
    } catch (e) {
        console.log("[ERROR] GameObjectManager : " + e);
    }

    this.services[CombatSevice.NAME].reset();
    if (this.activeLevel) {
        console.log("[CORE] unload current level");
        this.activeLevel.dispose();
        delete this.activeLevel;
    }
    this.gameobjects = new GameObjectManager(); // global gameobject

    console.log("[CORE] load level " + level);
    this.activeLevel = new this.levels[level](this);
    this.activeLevel.initialize(playerX, playerY);

}
/**
 * Game Core render
 * 
 * @this {Core}
 */
Core.prototype.render = function(event) {

    if (this.activeLevel) {
        var delta = event.delta / 1000;
        this.stage.update(event);
        this.gameobjects.render(event);

        // get player
        var player = this.gameobjects.get('player');
        // get hp and mp bar
        var hpBar = document.querySelector("#hp");
        var mpBar = document.querySelector("#mp");
        // update hp and mp
        hpBar.value = player.hp;
        mpBar.value = player.mp;
        mpBar.max = player.maxMp;
    }
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