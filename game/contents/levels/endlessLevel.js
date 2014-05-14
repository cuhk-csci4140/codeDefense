var util = require('util');
var AbstractLevel = require('./AbstractLevel');
var Mage = require('../../gameobjects/TestPlayer');
var Bori = require('../mobs/Bori');
var Chibi = require('../mobs/Chibi');
var Tree = require('../mobs/Tree');
var Usagi = require('../mobs/Usagi');
var CombatService = require('../services/CombatService');

var endlessLevel = function(world) {
    endlessLevel.super_.call(this, world);
};

util.inherits(endlessLevel, AbstractLevel);

endlessLevel.prototype.initialize = function(x, y) {

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

    for (var i = 1; i <= (6 + Math.ceil(Math.random() * 4)); i++) {
        var rand = Math.random();
        if (rand < 0.25) {
            this.set('mob' + i, Bori);

        } else if (rand < 0.5) {
            this.set('mob' + i, Chibi);

        } else if (rand < 0.75) {
            this.set('mob' + i, Tree);
            this.add(this.get('tree' + i));
        } else {
            this.set('mob' + i, Usagi);
        }

        var mob = this.get('mob' + i);

        var x;
        var y;
        do {
            x = 5 + Math.ceil(Math.random() * 7) - 1;
            y = Math.ceil(Math.random() * 6) - 1;
        } while ((x == 5 && y == 3) || this.gameboard[x][y] != null);
        // console.log(x);

        mob.setPosition(x, y);

        mob.setFaction(CombatService.TurnEnemy);
        this.add(mob);
    }

    this.initialized = true;
    this.get('player').mp = 200;
    this.get('player').maxMp = 200;
};

endlessLevel.prototype.update = function(event) {
    if (this.initialized) {

    }
};
endlessLevel.prototype.dispose = function() {

};

endlessLevel.prototype.jumpLevel = function() {
    this.world.connection.socket.emit("CM_SCORE", {
        data: this.world.score,
        stage: "Endless Mode"
    });
    showBox("Score: ", this.world.score);
    this.world.setLevel('endless');
};
endlessLevel.prototype.lost = function() {
    showBox("LOSS!", "GG Well Play!");
    endgamebox("Score: ", this.world.score);
};
module.exports = endlessLevel;