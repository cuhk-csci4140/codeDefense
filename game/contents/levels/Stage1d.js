var util = require('util');
var AbstractLevel = require('./AbstractLevel');
var Mage = require('../../gameobjects/TestPlayer');
var Bori = require('../mobs/Bori');
var Chibi = require('../mobs/Chibi');
var Tree = require('../mobs/Tree');
var Usagi = require('../mobs/Usagi');
var CombatService = require('../services/CombatService');

var Stage1d = function(world) {
    Stage1d.super_.call(this, world);
};

util.inherits(Stage1d, AbstractLevel);

Stage1d.prototype.initialize = function(x, y) {
    this.initialized = true;
    this.set('player', Mage);
    this.get('player').sprite.setTransform(70, 60, 0.6, 0.6);
    if (x != null && y != null) {
        this.get('player').setPosition(x, y);
    } else {
        this.get('player').setPosition(0, 0);
    }
    this.get('player').setFaction(CombatService.TurnAlly);

    var ground = new createjs.Shape();
    ground.graphics.beginBitmapFill(this.world.assets.getResult("board"),
            "no-repeat").drawRect(0, 0, 1440, 727);
    // ground.cache(0, 0, 1440, 727, 1 / world.ratio);

    this.add(ground, this.get('player'));

    for (var i = 0; i < 3; i++) {
        this.set('chibi' + i, Chibi);
        this.get('chibi' + i).setPosition(10, 2 * i);
        this.get('chibi' + i).setFaction(CombatService.TurnEnemy);
        this.add(this.get('chibi' + i));
    }
    for (var i = 0; i < 3; i++) {
        this.set('tree' + i, Usagi);
        this.get('tree' + i).setPosition(10, 2 * i + 1);
        this.get('tree' + i).setFaction(CombatService.TurnEnemy);
        this.add(this.get('tree' + i));
    }
    this.initialized = true;
    this.loadBGM();
};

Stage1d.prototype.update = function(event) {
    if (this.initialized) {

    }
};
Stage1d.prototype.dispose = function() {

};

Stage1d.prototype.jumpLevel = function() {
    this.world.connection.socket.emit("CM_SCORE", {data: this.world.score, stage: "Stage 1"});
    endgamebox("Stage Cleared!", "Score: " + this.world.score);
};

module.exports = Stage1d;