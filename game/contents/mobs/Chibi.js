var util = require('util');
var Mob = require('./Mob');
var Firepillar = require('../spells/Firepillar');
var Lightwall = require('../spells/Lightwall');
var CombatService = require('../services/CombatService');
var TestPlayer = require('../../gameobjects/TestPlayer');

var Chibi = function(world) {
    Chibi.super_.call(this, world);
    this.hp = 5;
    this.originHp = 5;
    this.padX = 40;
    this.padY = 40;
    this.setSpriteSheet(new createjs.SpriteSheet({
        "images": [world.assets.getResult("chibi")],
        "frames": {
            "regX": 108,
            "height": 216,
            "count": 35,
            "regY": 108,
            "width": 216
        },
        "animations": {
            "stand": [31, 34, "stand"],
            "initRun": [6, 9, "run", 6],
            "run": [6, 9, "run", 4],
            "attack": [10, 22, "stand", 5]
        }
    }));
    this.defaults.movement = 2000;
    this.stats.movement = 2000;
    this.defaultAnimation = "stand";
    this.damage = 30;

    this.AI = function(event, onComplete) {

        if (event.turn == this.faction) {
            this.myTurn = event;
            // action 1
            if (this.position.horizontal > 2) {
                var grid1 = this.world.activeLevel.gameboard[this.position.horizontal - 1][this.position.vertical];
                var grid2 = this.world.activeLevel.gameboard[this.position.horizontal - 2][this.position.vertical];
                if (grid1 == null) {
                    if (grid2 == null) {
                        // both 2 grid is null, can move freely
                        this.move(-2, 0);
                    } else {
                        if (grid2 instanceof Firepillar) {
                            this.move(-2, 0);
                            grid2.dealDamage(this);
                        } else if (grid2 instanceof Lightwall) {
                            this.move(-1, 0);
                        } else if (grid2 instanceof TestPlayer) {
                            this.move(-1, 0);
                            this.attack();
                            grid2.hp -= this.damage;
                        }
                    }
                } else {
                    if (grid1 instanceof Firepillar) {
                        this.move(-1, 0);
                        grid1.dealDamage(this);
                    } else if (grid1 instanceof Lightwall) {
                        // dun move, no need to check grid2
                    } else if (grid1 instanceof TestPlayer) {
                        // attack the player
                        this.attack();
                        grid1.hp -= this.damage;
                    }
                }
            } else if (this.position.horizontal == 2) {
                // check exist of grid1
                var grid1 = this.world.activeLevel.gameboard[this.position.horizontal - 1][this.position.vertical];
                var grid2 = this.world.activeLevel.gameboard[this.position.horizontal - 2][this.position.vertical];
                if (grid1 == null) {
                    if (grid2 instanceof TestPlayer) {
                        this.move(-1, 0);
                        this.attack();
                        grid2.hp -= this.damage;
                    } else {
                        this.move(-2, 0);
                        this.world.gameobjects.get("player").hp -= this.damage;
                        // showBox("CAUTION!", "A monster just passed you.");
                    }
                } else {
                    if (grid1 instanceof Firepillar) {
                        this.move(-1, 0)
                        grid1.dealDamge(this);
                    } else if (grid1 instanceof Lightwall) {

                    } else if (grid1 instanceof TestPlayer) {
                        this.attack();
                        grid1.hp -= this.damage;
                    }
                }
                // showBox("CAUTION!", "A monster just passed you.");
            } else if (this.position.horizontal == 1) {
                var grid1 = this.world.activeLevel.gameboard[this.position.horizontal - 1][this.position.vertical];
                if (grid1 == null) {
                    this.move(-1, 0);
                    this.world.gameobjects.get("player").hp -= this.damage;
                    // showBox("CAUTION!", "A monster just passed you.");
                } else {
                    if (grid1 instanceof TestPlayer) {
                        this.attack()
                        grid1.hp -= this.damage;
                    } else {
                        this.move(-1, 0);
                        this.world.gameobjects.get("player").hp -= this.damage;
                        // showBox("CAUTION!", "A monster just passed you.");
                    }
                }
            } else {
                // at position 0
                this.dispose();
            }
        }
        // action 2
        this.queue_(function(done) {

            done();
            onComplete();
            world.services[CombatService.NAME].nextTurn(event);
            console.log("Chibi is done");
        });

        // start the queue.
        this.triggerAction();

    }.bind(this);
    // register to script service
    world.services[CombatService.NAME].subscribe(CombatService.Events.NextTurn,
            this.AI);

    console.log("Chibi initialized");
    this.initialize();
    this.sprite.setTransform(0, 0, -0.6, 0.6);
};

util.inherits(Chibi, Mob);

Chibi.prototype.onStartMoving_ = function() {
    this.gotoAndPlay("initRun");
};

Chibi.prototype.onStopMoving_ = function() {
    this.gotoAndPlay("stand");
};
Chibi.prototype.attack = function() {
    this.gotoAndPlay("attack");
}
// BoardObject.prototype.moveTo_ = function(h, v, equation, onCompleteEvent) {
module.exports = Chibi;