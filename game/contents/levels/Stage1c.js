var util = require('util');
var AbstractLevel = require('./AbstractLevel');
var Mage = require('../../gameobjects/TestPlayer');
var Bori = require('../mobs/Bori');
var CombatService = require('../services/CombatService');

var Stage1c = function(world) {
    Stage1c.super_.call(this, world);
};

util.inherits(Stage1c, AbstractLevel);

Stage1c.prototype.initialize = function(x, y) {

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

    for (var i = 0; i < 6; i++) {
        this.set('bori' + i, Bori);
        this.get('bori' + i).setPosition(11, i);
        this.get('bori' + i).setFaction(CombatService.TurnEnemy);
        this.add(this.get('bori' + i));
    }
    this.initialized = true;
};

Stage1c.prototype.update = function(event) {
    if (this.initialized) {

    }
};
Stage1c.prototype.dispose = function() {

};

Stage1c.prototype.jumpLevel = function() {
	this.world.connection.socket.emit("CM_SCORE",{data : this.world.score , stage : "Stage 1"});
    endgamebox("Stage Cleared!", "Score: "+this.world.score);
};

module.exports = Stage1c;