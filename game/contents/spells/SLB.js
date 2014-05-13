var util = require('util');
var Castable = require('../../gameobjects/Castable');
var Mob = require('../mobs/Mob');
var SLB = function(world) {
    SLB.super_.call(this, world);
    this.name = "SLB";
    this.setSpriteSheet(new createjs.SpriteSheet({
        "images": [this.world.assets.getResult("SLB")],
        "frames": {
            "regX": 200,
            "height": 200,
            "count": 24,
            "regY": 200,
            "width": 1600
        },
        "animations": {
            "initial": [0, 10, null, 5],
            "ready": [11, 13, null, 5],
            "shoot": [14, 18, null, 3],
            "shoot2": [19,19, null , 2],
            "shoot3": [20, 23, null, 3]
        }
    }));
    this.defaultAnimation = "initial";
    this.castTime = 10;
    this.damage = 100;
    this.cost = 0;
    console.log("SLB initialized");
    this.initialize();
}

util.inherits(SLB, Castable);

SLB.prototype.execute = function(caster, onComplete) {
    return (function() {
        this.queue_(function(done) {
            console.log("SLB cast");
            // calculate target
            this.calTarget(caster);
            this.sprite.setTransform(caster.sprite.x + 210,
                    caster.sprite.y + 100, 1, 1);

            var level = this.world.activeLevel;
            level.add(this);
            this.gotoAndPlay("initial", done);


        });


        this.queue_(function(done) {
            this.gotoAndPlay("initial", done);
        });

        this.queue_(function(done) {
            console.log("Ready to shoot!");
            this.gotoAndPlay("ready", done);
        });

        this.queue_(function(done) {
            console.log("SLB shoot!");
            this.gotoAndPlay("shoot", done);
            
        });
        
        
        this.queue_(function(done) {
            this.gotoAndPlay("shoot2", done);
            
        });
        
        
        this.queue_(function(done) {
            this.gotoAndPlay("shoot3", done);
            this.dealDamage();
        });

        this.queue_(function(done) {
            this.dealDamage();
            console.log("SLB FINISHED!");
            var level = this.world.activeLevel;
            level.remove(this);
            onComplete();
        });
        this.triggerAction();
    }).bind(this);
};

SLB.prototype.calTarget = function(caster) {
    console.log(this.name + " calculating target");
    var gameBoard = this.world.activeLevel.gameboard;
    var vertical = this.position.vertical;
    var horizontal;
    var target;
    // flag to indicate if target array all null
    var allNull = true;
    for (horizontal = (this.position.horizontal + 1); horizontal < 12; horizontal++) {
        target = gameBoard[horizontal][vertical];
        if (target instanceof Mob) {
            console.log("H: " + horizontal + " V: " + vertical + " is Mob");
            allNull = false;
            this.target.push(target);

        }
        // this.target = gameBoard[horizontal][vertical];
    }
    if (allNull || this.penetrate) {
        this.targetX = 13;
        this.targetY = vertical;
        if (allNull) {
            this.target = [];
        }
    }
};
module.exports = SLB;