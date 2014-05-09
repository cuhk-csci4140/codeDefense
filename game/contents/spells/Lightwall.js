var util = require('util');
var Castable = require('../../gameobjects/Castable');

var Lightwall = function(world, args) {
    Lightwall.super_.call(this, world);
    this.name = "Lightwall";
    this.setSpriteSheet(new createjs.SpriteSheet({
        "images": [this.world.assets.getResult("lightwall")],
        "frames": {
            "regX": 98,
            "height": 196,
            "count": 27,
            "regY": 96,
            "width": 192
        },
        "animations": {
            "initial": [0, 7, "active", 2],
            "active": [8, 18, "active", 4],
            "end": [19, 27, 2]
        }
    }));
    this.defaultAnimation = "initial";
    this.castTime = 1;
    this.cost = 25;
    if (args == null) {
        throw new Error("No distance defined");
    } else {
        this.args = args;
    }
    console.log("Lightwall initialized");
    this.initialize();
}

util.inherits(Lightwall, Castable);

Lightwall.prototype.execute = function(caster, onComplete) {
    this.queue_(function(done) {
        console.log("lightwall");
        if (this.args[0] > caster.stats.castRange) {
            throw new Error("Cast Distance too long!");
        }
        var distX = this.args[0];
        // check bounding, if exceed 12 cast at 12;        // check bounding, if exceed 12 cast at 12;
        if ((caster.position.horizontal + distX) > 12) {
            distX = 12 - caster.position.horizontal;
        }
        this.sprite.setTransform(caster.sprite.x + (120 * distX), caster.sprite.y - 20,
                0.8, 0.8);
        this.position.vertical = caster.position.vertical;
        this.position.horizontal = (caster.position.horizontal + distX);
        var level = this.world.activeLevel;
        level.gameboard[this.position.horizontal][this.position.vertical] = this;
        level.add(this);
        this.gotoAndPlay("initial");
        done();

    });
    this.triggerAction();
    // var tween = createjs.Tween.get(this).to({x:caster.boardWidth,
    // y:caster.y}, (600 * distance) , createjs.Ease.linear);

};

module.exports = Lightwall;