var util = require('util');
var AbstractLevel = require('./AbstractLevel');
var Mage = require('../../gameobjects/TestPlayer');
var Bori = require('../mobs/Bori');
var CombatService = require('../services/CombatService');

var testLevel = function(world) {
    testLevel.super_.call(this, world);
};

util.inherits(testLevel, AbstractLevel);

testLevel.prototype.initialize = function(x, y, hp) {

    this.initialized = true;

    this.set('player', Mage);
    this.get('player').sprite.setTransform(70, 60, 0.6, 0.6);
    if (x != null && y != null) {
        this.get('player').setPosition(x, y);
    } else {
        this.get('player').setPosition(0, 0);
    }
    if (hp != null) {
        this.get('player').hp = hp;
    }
    this.get('player').setFaction(CombatService.TurnAlly);

    var ground = new createjs.Shape();
    ground.graphics.beginBitmapFill(this.world.assets.getResult("board"),
            "no-repeat").drawRect(0, 0, 1440, 727);
    // ground.cache(0, 0, 1440, 727, 1 / world.ratio);

    this.add(ground, this.get('player'));

    for (var i = 1; i <= 10; i++) {
        this.set('bori' + i, Bori);
        var currentBori = this.get('bori' + i);
        currentBori.sprite.setTransform(0, 0, -0.6, 0.6);
        var x;
        var y;
        do {
            x = 4 + Math.ceil(Math.random() * 8) - 1;
            y = Math.ceil(Math.random() * 6) - 1;
        } while ((x == 5 && y == 3) || this.gameboard[x][y] != null);
        // console.log(x);

        currentBori.setPosition(x, y);
        //currentBori.hpBar.setTransform(35 + 120 * x, (120 * y) + 10, 0.6, 0.6);
        currentBori.setFaction(CombatService.TurnEnemy);
        this.add(currentBori);
    }
    console.log(this.gameboard);

    this.initialized = true;
    this.get('player').maxMp = 200;
    this.get('player').mp = 200;
    this.loadBGM();
};

testLevel.prototype.update = function(event) {
    if (this.initialized) {

    }
};
testLevel.prototype.dispose = function() {

};
testLevel.prototype.jumpLevel = function() {
    this.world.connection.socket.emit("CM_SCORE", {
        data: this.world.score,
        stage: "Stage Test"
    });
    showBox("WOW SCORE", this.world.score);
};
module.exports = testLevel;