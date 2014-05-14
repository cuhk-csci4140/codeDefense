var util = require('util');
var AbstractLevel = require('./AbstractLevel');
var Mage = require('../../gameobjects/TestPlayer');
var Bori = require('../mobs/Bori');
var Chibi = require('../mobs/Chibi');
var CombatService = require('../services/CombatService');

var Stage1b = function(world) {
    Stage1b.super_.call(this, world);
};

util.inherits(Stage1b, AbstractLevel);

Stage1b.prototype.initialize = function(x, y) {
    this.initialized = true;
    this.set('player', Mage);
    this.get('player').sprite.setTransform(70, 60, 0.6, 0.6);
    if (x != null && y != null) {
        this.get('player').setPosition(x, y);
    } else {
        this.get('player').setPosition(0, 3);
    }
    this.get('player').setFaction(CombatService.TurnAlly);

    var ground = new createjs.Shape();
    ground.graphics.beginBitmapFill(this.world.assets.getResult("board"),
            "no-repeat").drawRect(0, 0, 1440, 727);
    // ground.cache(0, 0, 1440, 727, 1 / world.ratio);

    this.add(ground, this.get('player'));

    for (var i = 0; i < 3; i++) {
        this.set('bori' + i, Bori);
        this.get('bori' + i).setPosition(11, 2 * i);
        this.get('bori' + i).setFaction(CombatService.TurnEnemy);
        this.add(this.get('bori' + i));
    }
    for (var i = 0; i < 3; i++) {
        this.set('chibi' + i, Chibi);
        this.get('chibi' + i).setPosition(11, 2 * i + 1);
        this.get('chibi' + i).setFaction(CombatService.TurnEnemy);
        this.add(this.get('chibi' + i));
    }
    this.initialized = true;
};

Stage1b.prototype.update = function(event) {
    if (this.initialized) {

    }
};
Stage1b.prototype.dispose = function() {

};

Stage1b.prototype.jumpLevel = function() {
    showBox("Wave 2 Cleared!", "Wave 3 is coming!");
    this.world.setLevel('stage1c');
};

module.exports = Stage1b;