var util = require('util');
var Mob = require('./Mob');
var Firepillar = require('../spells/Firepillar');
var Lightwall = require('../spells/Lightwall');
var CombatService = require('../services/CombatService');
var TestPlayer = require('../../gameobjects/TestPlayer');

var Tree = function(world) {
    Tree.super_.call(this, world);
    this.hp = 5;
    this.originHp = 5;
    this.padX = 50;
    this.padY = 30;
    this.setSpriteSheet(new createjs.SpriteSheet({
        "images": [world.assets.getResult("tree")],
        "frames": {
            "regX": 132,
            "height": 264,
            "count": 28,
            "regY": 132,
            "width": 264
        },
        "animations": {
            "stand": [0, 1, "stand"],
            "initRun": [2, 5, "run", 6],
            "run": [2, 5, "run", 4],
            "attack": [6, 17, "stand", 5]
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
                console.log("Tree is done");
            });

            // start the queue.
            this.triggerAction();
        }
    }.bind(this);
    // register to script service
    world.services[CombatService.NAME].subscribe(CombatService.Events.NextTurn,
            this.AI);

    console.log("Tree initialized");
    this.initialize();
    // remember to add things
    this.sprite.setTransform(0, 0, -0.6, 0.6);
};

util.inherits(Tree, Mob);

Tree.prototype.onStartMoving_ = function() {
    this.gotoAndPlay("initRun");
};

Tree.prototype.onStopMoving_ = function() {
    this.gotoAndPlay("stand");
};
Tree.prototype.attack = function(){
    this.gotoAndPlay("attack");
}
// BoardObject.prototype.moveTo_ = function(h, v, equation, onCompleteEvent) {
module.exports = Tree;