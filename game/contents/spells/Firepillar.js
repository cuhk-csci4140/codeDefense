var util = require('util');
var Castable = require('../../gameobjects/Castable');
var CombatService = require('../services/CombatService');
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
    this.damage = 3;
    this.cost = 15;

    if (args == null) {
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
        if (this.args[0] > caster.stats.castRange) {
            throw new Error("Cast Distance too long!");
        }
        var distX = this.args[0];
        // check bounding, if exceed 12 cast at 13 i.e=fail
        if ((caster.position.horizontal + distX) > 12) {
            throw new Error("Firepillar casted in VOID!");
        }
        this.sprite.setTransform(caster.sprite.x + (120 * distX), caster.sprite.y - 120, 1, 1);
        this.position.vertical = caster.position.vertical;
        this.position.horizontal = (caster.position.horizontal + distX);
        this.targetX = this.position.horizontal + 1; // cause it is a queue!!!
        this.targetY = this.position.vertical;
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
Firepillar.prototype.dealDamage = function(target) {
    this.queue_(function(done) {
        console.log("----------Firepillar get target-------");
        //var target = this.world.activeLevel.gameboard[this.targetX][this.targetY];
        // try add target when call
    	this.world.services[CombatService.NAME].callLater(2,(function(){
     
    	console.log("----------Firepillar deal damage to target-------");
        target.hp -= this.damage;
        if (target.hp > 0) {
            var scale = (target.hp / target.originHp);
            target.hpBar.graphics.clear();
            target.hpBar.graphics.beginFill("#ff0000").drawRect(0, 0, (100 * scale), 10);
        }
        else {
            this.world.activeLevel.remove(target);
        }
        // call the finish function;
        this.finish();
    	}).bind(this));
    });

	
    this.triggerAction();
};

Firepillar.prototype.finish = function() {
    this.queue_(function(done) {
        console.log("Mobs hit Firepillar");
        // play the end motion
        this.gotoAndPlay("end", done);
    });
    // destroy the firepillar
    this.queue_(function(done) {
        console.log("Firepillar destroy");
        var level = this.world.activeLevel;
        level.remove(this);
    });
    this.triggerAction();
};

module.exports = Firepillar;