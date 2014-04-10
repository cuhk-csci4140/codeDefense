var util = require('util');
var Castable = require('../../gameobjects/Castable');

var Thunderbolt = function(world, args) {
    Thunderbolt.super_.call(this, world);
    this.name = "Thunderbolt";
    this.setSpriteSheet(new createjs.SpriteSheet({
        "images": [this.world.assets.getResult("thunderbolt")],
        "frames": {
            "regX": 160,
            "height": 560,
            "count": 39,
            "regY": 0,
            "width": 320
        },
        "animations": {
            "initial": [0, 39, null, 10]
        }
    }));
    this.defaultAnimation = "initial";
    this.args = args;
    this.castTime = 5;
    console.log("Thunderbolt initialized");
    this.initialize();
}

util.inherits(Thunderbolt, Castable);

Thunderbolt.prototype.execute = function(caster) {
    return (function() {
        this.queue_(function(done) {
            console.log("Thunderbolt cast");
            var distX = parseInt(this.args[0]);
            var distY = parseInt(this.args[1]);
            // do the range limit
            if ((distX > 0 && distX <= caster.stats.castRange) && (distY > 0 && distY <= caster.stats.castRange)) {
                this.targetX = caster.position.horizontal + distX;
                this.targetY = caster.position.vertical + distY;
                if (this.targetX < 12 && this.targetY < 6) {
                    this.sprite
                            .setTransform(caster.sprite.x + (120 * distX), caster.sprite.y - 480 + (120 * distY), 1, 1);
                    this.position.vertical = this.targetY;
                    this.position.horizontal = this.targetX;
                    var level = this.world.activeLevel;
                    level.add(this);
                    this.gotoAndPlay("initial");
                }
                else {
                    console.log("Casting Range exist board range");
                }
            } else {
                console.log("Casting Range exist character's range");
            }
        });
        this.queue_(function(done) {
            console.log("Thunderbolt cast finish");
            var level = this.world.activeLevel;
            level.remove(this);
        });
        this.triggerAction();
    }).bind(this);
};
module.exports = Thunderbolt;