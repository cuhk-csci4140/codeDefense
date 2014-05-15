var util = require('util');
var Mob = require('./Mob');
var Firepillar = require('../spells/Firepillar');
var Lightwall = require('../spells/Lightwall');
var CombatService = require('../services/CombatService');
var TestPlayer = require('../../gameobjects/TestPlayer');

var Bori = function(world) {
    Bori.super_.call(this, world);
    this.hp = 2;
    this.originHp = 2;
    this.padX = 65;
    this.padY = 70;
    this.setSpriteSheet(new createjs.SpriteSheet({
        "images": [world.assets.getResult("bori")],
        "frames": {
            "regX": 52,
            "height": 104,
            "count": 76,
            "regY": 74.5,
            "width": 149
        },
        "animations": {
            "stand": [0, 5, "stand"],
            "initRun": [11, 16, "run", 6],
            "run": [16, 22, "run", 4]
        }
    }));
    this.defaults.movement = 2000;
    this.stats.movement = 2000;
    this.defaultAnimation = "stand";
    this.damage = 20;

    this.myTurn = {};

    this.AI = function(event, onComplete) {
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
                        grid.dealDamage(this);
                    } else if (grid instanceof Lightwall) {
                        // dun move, no codes
                    } else if (grid instanceof TestPlayer) {
                        // attack the player!
                        grid.hp -= this.damage;
                    }
                }
            } else if (this.position.horizontal == 1) {
                var grid = this.world.activeLevel.gameboard[this.position.horizontal - 1][this.position.vertical];
                if (grid != null && grid instanceof TestPlayer) {
                    // attack the player!
                    grid.hp -= this.damage;
                } else {
                    this.move(-1, 0);
                    this.world.gameobjects.get("player").hp -= this.damage;
                    // showBox("CAUTION!", "A monster just passed you.");
                }
            } else {
                // despawn
                this.dispose();
            }
        }
        // action 2
        this.queue_(function(done) {

            onComplete();
            done();
            world.services[CombatService.NAME].nextTurn(event);
            console.log("Bori is done");
        });

        // start the queue.
        this.triggerAction();

    }.bind(this);
    // register to script service
    world.services[CombatService.NAME].subscribe(CombatService.Events.NextTurn,
            this.AI);

    console.log("Bori initialized");
    this.initialize();
    this.sprite.setTransform(0, 0, -0.6, 0.6);
};

util.inherits(Bori, Mob);

Bori.prototype.onStartMoving_ = function() {
    this.gotoAndPlay("initRun");
};

Bori.prototype.onStopMoving_ = function() {
    this.gotoAndPlay("stand");
};

// BoardObject.prototype.moveTo_ = function(h, v, equation, onCompleteEvent) {
module.exports = Bori;