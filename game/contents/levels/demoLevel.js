var util = require('util');
var AbstractLevel = require('./AbstractLevel');
var Mage = require('../../gameobjects/TestPlayer');
var Bori = require('../mobs/Bori');
var Chibi = require('../mobs/Chibi');
var Tree = require('../mobs/Tree');
var Usagi = require('../mobs/Usagi');
var CombatService = require('../services/CombatService');

var demoLevel = function(world) {
    demoLevel.super_.call(this, world);
};

util.inherits(demoLevel, AbstractLevel);

demoLevel.prototype.initialize = function(x, y) {

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

    for (var i = 6; i <= 11; i++) {
        var rand = Math.random();
        if (rand < 0.3) {
            this.set('bori' + i, Bori);
            /*this.get('bori' + i).sprite.setTransform(70 + 120 * i, 60 * (i - 6), //70
             -0.7, 0.7);
             this.get('bori' + i).hpBar.setTransform(35 + 120 * i, (120 * (i - 6)) + 10,
             0.6, 0.6);*/
            this.get('bori' + i).setPosition(i, i - 6);
            this.get('bori' + i).setFaction(CombatService.TurnEnemy);
            this.add(this.get('bori' + i));
        } else if (rand < 0.5) {
            this.set('chibi' + i, Chibi);
            /*this.get('chibi' + i).sprite.setTransform(30+ 120 * i, -30 * (i - 6),
             -0.6, 0.6);
             this.get('chibi' + i).hpBar.setTransform(35 + 120 * i, (120 * (i - 6)) + 10,
             0.6, 0.6);*/
            this.get('chibi' + i).setPosition(i, i - 6);
            this.get('chibi' + i).setFaction(CombatService.TurnEnemy);
            this.add(this.get('chibi' + i));
        } else if (rand < 0.8) {
            this.set('tree' + i, Tree);
            this.get('tree' + i).setPosition(i, i - 6);
            this.get('tree' + i).setFaction(CombatService.TurnEnemy);
            this.add(this.get('tree' + i));
        } else {
            this.set('usagi' + i, Usagi);
            this.get('usagi' + i).setPosition(i, i - 6);
            this.get('usagi' + i).setFaction(CombatService.TurnEnemy);
            this.add(this.get('usagi' + i));
        }
    }
    this.initialized = true;
    this.get('player').mp = 200;
    this.get('player').maxMp = 200;
};

demoLevel.prototype.update = function(event) {
    if (this.initialized) {

    }
};
demoLevel.prototype.dispose = function() {

};

demoLevel.prototype.jumpLevel = function() {
    this.world.setLevel('test');
};

module.exports = demoLevel;