var util = require('util');
var AbstractLevel = require('./AbstractLevel');
var Mage = require('../../gameobjects/TestPlayer');
var Bori = require('../mobs/Bori');
var CombatService = require('../services/CombatService');

var Stage1a = function(world) {
    Stage1a.super_.call(this, world);
};

util.inherits(Stage1a, AbstractLevel);

Stage1a.prototype.initialize = function() {

    this.initialized = true;

    this.set('player', Mage);
    this.get('player').sprite.setTransform(70, 60, 0.6, 0.6);
    this.get('player').setPosition(0, 3);
    this.get('player').setFaction(CombatService.TurnAlly);

    var ground = new createjs.Shape();
    ground.graphics.beginBitmapFill(this.world.assets.getResult("board"),
            "no-repeat").drawRect(0, 0, 1440, 727);
    // ground.cache(0, 0, 1440, 727, 1 / world.ratio);

    this.add(ground, this.get('player'));

    for (var i = 0; i < 6; i++) {
        this.set('bori' + i, Bori);
        this.get('bori' + i).setPosition(11, i);
        this.get('bori' + i).setFaction(CombatService.TurnEnemy);
        this.add(this.get('bori' + i));
    }
    this.initialized = true;
    this.loadBGM();
};

Stage1a.prototype.update = function(event) {
    if (this.initialized) {

    }
};
Stage1a.prototype.dispose = function() {

};

Stage1a.prototype.jumpLevel = function() {
    showBox("Wave 1 Cleared!", "Wave 2 is coming!");
    this.world.setLevel('stage1b');
};

module.exports = Stage1a;