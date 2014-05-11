var util = require('util');
var Mob = require('./Mob');
var Firepillar = require('../spells/Firepillar');
var Lightwall = require('../spells/Lightwall');
var CombatService = require('../services/CombatService');
var TestPlayer = require('../../gameobjects/TestPlayer');

var Usagi = function(world) {
    Usagi.super_.call(this, world);
    this.hp = 1;
    this.originHp = 1;
    this.padX = 65;
    this.padY = 50;
    this.setSpriteSheet(new createjs.SpriteSheet({
        "images": [world.assets.getResult("usagi")],
        "frames": {
            "regX": 56,
            "height": 112,
            "count": 45,
            "regY": 56,
            "width": 112
        },
        "animations": {
            "stand": [0, 1, "stand"],
            "initRun": [2, 7, "run", 6],
            "run": [8, 14, "run", 4],
            "attack": [15, 26, "stand", 5]
        }
    }));
    this.defaults.movement = 2000;
    this.stats.movement = 2000;
    this.defaultAnimation = "stand";
    this.damage = 10;

    this.myTurn = {};

    this.AI = function(event) {
        if (event.turn == this.faction) {
            this.myTurn = event;

            // action 1
            if (this.position.horizontal > 1) {
                var grid = this.world.activeLevel.gameboard[this.position.horizontal - 1][this.position.vertical];
                if (grid == null) {
                    // able to move
                    this.move(-3, 0);
                } else {
                    if (grid instanceof Firepillar) {
                        this.move(-3, 0);
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
                console.log("Usagi is done");
            });

            // start the queue.
            this.triggerAction();
        }
    }.bind(this);
    // register to script service
    world.services[CombatService.NAME].subscribe(CombatService.Events.NextTurn,
            this.AI);

    console.log("Usagi initialized");
    this.initialize();
    // remember to add things
    this.sprite.setTransform(0, 0, 1, 1);
};

util.inherits(Usagi, Mob);

Usagi.prototype.onStartMoving_ = function() {
    this.gotoAndPlay("initRun");
};

Usagi.prototype.onStopMoving_ = function() {
    this.gotoAndPlay("stand");
};
Usagi.prototype.attack = function(){
    this.gotoAndPlay("attack");
};

module.exports = Usagi;
