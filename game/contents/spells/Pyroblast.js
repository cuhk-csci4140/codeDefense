var util = require('util');
var Castable = require('../../gameobjects/Castable');

var Pyroblast = function(world) {
    Pyroblast.super_.call(this, world);
    this.name = "Pyroblast";
    this.setSpriteSheet(new createjs.SpriteSheet({
        "images": [this.world.assets.getResult("pyroblast")],
        "frames": {
            "regX": 80,
            "height": 160,
            "count": 24,
            "regY": 160,
            "width": 320
        },
        "animations": {
            "initial": [0, 4, "travel", 2],
            "travel": [5, 14, "travel", 2],
            "explosion": [15, 19, "end", 4],
            "end": [20, 24, null, 4]
        }
    }));
    this.defaultAnimation = "initial";
    console.log("Pyroblast initialized");
    this.initialize();
}

util.inherits(Pyroblast, Castable);

Pyroblast.prototype.execute = function(caster) {
    console.log("fireball calculating target");
    this.calTarget(caster);
    this.queue_(function(done) {
        console.log("Pyroblast");
        this.sprite.setTransform(caster.sprite.x, caster.sprite.y, 1, 1);
        // here fix sprite not in position
        this.position.vertical = caster.position.vertical;
        this.position.horizontal = caster.position.horizontal;
        var level = this.world.activeLevel;
        level.add(this);
        this.gotoAndPlay("initial", done);
        // explosion remember to transform
    });
    this.queue_(function(done) {
        this.gotoAndPlay("travel");
        this.moveTo_(this.targetX, this.targetY, createjs.Ease.quartIn, done);
    });

    this.queue_(function(done) {
        console.log("Pyroblast explode!");
        this.gotoAndPlay("explosion", done);
    });
    this.queue_(function(done) {
        console.log("remove Pyroblast");
        var level = this.world.activeLevel;
        level.remove(this);
        done();
    });
    this.triggerAction();

};
Pyroblast.prototype.calTarget = function(caster) {
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
module.exports = Pyroblast;