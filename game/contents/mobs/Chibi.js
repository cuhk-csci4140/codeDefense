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
    this.damage = 50;

    this.myTurn = {};

    this.AI = function(event) {
        if (event.turn == this.faction) {
            this.myTurn = event;

            // action 1
            if (this.position.horizontal > 1) {
                var grid = this.world.activeLevel.gameboard[this.position.horizontal - 1][this.position.vertical];
                if (grid == null) {
                    // able to move
                    this.move(-1, 0);
                } else {
                    if (grid instanceof Firepillar) {
                        this.move(-1, 0);
                        grid.dealDamage();
                    } else if (grid instanceof Lightwall) {
                        // dun move, no codes
                    } else if (grid instanceof TestPlayer) {
                        // attack the player!
                        this.attack();
                        grid.hp -= this.damage;
                    }
                }
            } else if (this.position.horizontal == 1) {
                this.move(-1, 0);
                this.world.gameobjects.get("player").hp -= this.damage;
                // showBox("CAUTION!", "A monster just passed you.");
            } else {
                // despawn
                this.dispose();
            }

            // action 2
            this.queue_(function(done) {

                done();
                world.services[CombatService.NAME].nextTurn(event);
                console.log("Chibi is done");
            });

            // start the queue.
            this.triggerAction();
        }
    }.bind(this);
    // register to script service
    world.services[CombatService.NAME].subscribe(CombatService.Events.NextTurn,
            this.AI);

    console.log("Chibi initialized");
    this.initialize();
};

util.inherits(Chibi, Mob);

Chibi.prototype.onStartMoving_ = function() {
    this.gotoAndPlay("initRun");
};

Chibi.prototype.onStopMoving_ = function() {
    this.gotoAndPlay("stand");
};
Chibi.prototype.attack = function(){
    this.gotoAndPlay("attack");
}
// BoardObject.prototype.moveTo_ = function(h, v, equation, onCompleteEvent) {
module.exports = Chibi;