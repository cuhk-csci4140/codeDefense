var util = require('util');
var Castable = require('../../gameobjects/Castable');

var Firepillar = function(world, args) {
    Firepillar.super_.call(this, world);
    this.name = "Firepillar";
    this.setSpriteSheet(new createjs.SpriteSheet({
        "images": [this.world.assets.getResult("firepillar")],
        "frames": {
            "regX": 48,
            "height": 176,
            "count": 27,
            "regY": 0,
            "width": 96
        },
        "animations": {
            "initial": [0, 6, "active", 2],
            "active": [7, 20, "active", 4],
            "end": [21, 27, null, 2]
        }
    }));
    this.defaultAnimation = "initial";
    this.castTime = 0.5;
    if(args == null){
        throw new Error("No distance defined");
    } else {
        this.args = args;
    }
    
    console.log("Firepillar initialized");
    this.initialize();
}

util.inherits(Firepillar, Castable);


Firepillar.prototype.execute = function(caster) {
    this.queue_(function(done) {
        console.log("Firepillar");
        if(this.args[0] > caster.stats.castRange){
            throw new Error("Cast Distance too long!");
        }
        var distX = this.args[0];
        // check bounding, if exceed 12 cast at 12;        // check bounding, if exceed 12 cast at 12;
        if((caster.position.horizontal + distX) > 12){
            distX = 12 - caster.position.horizontal;
        }
        this.sprite.setTransform(caster.sprite.x + (120*distX), caster.sprite.y - 120, 1, 1);
        this.position.vertical = caster.position.vertical;
        this.position.horizontal = (caster.position.horizontal + distX);
        var level = this.world.activeLevel;
        level.gameboard[this.position.horizontal][this.position.vertical] = this;
        level.add(this);
        this.gotoAndPlay("initial", done);
    });
    // done();
    // var tween = createjs.Tween.get(this).to({x:caster.boardWidth,
    // y:caster.y}, (600 * distance) , createjs.Ease.linear);
    // explosion remember to transform
    this.queue_(function(done) {
        // implement later
        // check the number of turn then end
    });
    this.triggerAction();
};

module.exports = Firepillar;