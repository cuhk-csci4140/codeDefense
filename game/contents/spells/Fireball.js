var util = require('util');
var Castable = require('../../gameobjects/Castable');

var Fireball = function(world) {
    Fireball.super_.call(this, world);
    this.name = "Fireball";
    this.setSpriteSheet(new createjs.SpriteSheet({
        "images": [this.world.assets.getResult("fireball")],
        "frames": {
            "regX": 63,
            "height": 128,
            "count": 28,
            "regY": 63,
            "width": 128
        },
        "animations": {
            "initial": [0, 6, null, 4],
            "travel": [7, 17, "travel"],
            "explode": [18, 28, null, 6]
        }
    }));
    this.defaultAnimation = "initial";

    this.castTime = 1.5;
    console.log("Fireball initialized");
    this.initialize();
}
util.inherits(Fireball, Castable);
Fireball.exposeMethods = ["m1"];

Fireball.prototype.m1 = function() {
    console.log("m1");
};
Fireball.prototype.m2 = function() {
    console.log("m2");
};
Fireball.prototype.execute = function(caster, onComplete) {
    console.log("fireball calculating target");
    this.queue_(function(done) {
        this.calTarget(caster);
        console.log("fireball!");
        var distance = caster.boardWidth - (caster.x + 70);
        this.sprite.setTransform(caster.sprite.x + 70, caster.sprite.y, 1, 1);
        this.position.vertical = caster.position.vertical;
        this.position.horizontal = caster.position.horizontal;
        var level = this.world.activeLevel;
        level.add(this);
        this.stats.movement = 250;
        this.gotoAndPlay("initial", done);

    });

    this.queue_(function(done) {
        this.gotoAndPlay("travel", done);
        this.moveTo_(this.targetX, this.targetY, createjs.Ease.quartIn, done);
    });

    this.queue_(function(done) {
        console.log("fireball explode!");
        this.gotoAndPlay("explode", done);
    });
    this.queue_(function(done) {
        console.log("remove fireball");
        var level = this.world.activeLevel;
        level.remove(this);
    });
    this.triggerAction();

};

Fireball.prototype.calTarget = function(caster) {
    // get back the gameBoard
    var gameBoard = this.world.activeLevel.gameboard;
    // Fireball is horizontal shooting
    // get the first hit target in same horizontal
    var vertical = caster.position.vertical;
    var horizontal;
    var target;
    for (horizontal = (caster.position.horizontal + 1); horizontal < 12; horizontal++) {
        if ((target = gameBoard[horizontal][vertical]) != null) {
            break;
        }
    }
    this.targetX = horizontal;
    this.targetY = vertical;
}

module.exports = Fireball;