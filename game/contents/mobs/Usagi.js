var util = require('util');
var Mob = require('./Mob');
var Firepillar = require('../spells/Firepillar');
var Lightwall = require('../spells/Lightwall');
var CombatService = require('../services/CombatService');
var TestPlayer = require('../../gameobjects/TestPlayer');

var Usagi = function(world) {

    Usagi.super_.call(this, world);
    this.hp = 2;
    this.originHp = 2;
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
    this.damage = 90;
    this.stats.castRange = 3;
    this.myTurn = {};

    this.AI = function(event, onComplete) {
        if (event.turn == this.faction) {
            this.myTurn = event;

            // action 1
            if (this.position.horizontal > 3) {
                var grid1 = this.world.activeLevel.gameboard[this.position.horizontal - 1][this.position.vertical];
                var grid2 = this.world.activeLevel.gameboard[this.position.horizontal - 2][this.position.vertical];
                var grid3 = this.world.activeLevel.gameboard[this.position.horizontal - 3][this.position.vertical];
                if (grid1 == null) {
                    if (grid2 == null) {
                        if (grid3 == null) {
                            // all 3 grid are free, move
                            this.move(-3, 0);
                        } else {
                            if (grid3 instanceof Firepillar) {
                                this.move(-3, 0);
                                grid3.dealDamage(this);
                            } else if (grid3 instanceof Lightwall) {
                                this.move(-2, 0);
                            } else if (grid3 instanceof TestPlayer) {
                                this.move(-2, 0);
                                this.attack();
                                grid3.hp -= this.damage;
                            }
                        }
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
            } else if (this.position.horizontal == 3) {
                // check exist of grid1
                var grid1 = this.world.activeLevel.gameboard[this.position.horizontal - 1][this.position.vertical];
                var grid2 = this.world.activeLevel.gameboard[this.position.horizontal - 2][this.position.vertical];
                var grid3 = this.world.activeLevel.gameboard[this.position.horizontal - 3][this.position.vertical];
                if (grid1 == null) {
                    if (grid2 == null) {
                        // pass and damage
                        if (grid3 instanceof TestPlayer) {
                            this.move(-2, 0);
                            this.attack();
                            grid3.hp -= this.damage;
                        } else {
                            this.move(-3, 0);
                            this.world.gameobjects.get("player").hp -= this.damage;
                            // showBox("CAUTION!", "A monster just passed
                            // you.");
                        }
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
                        this.move(-1, 0)
                        grid1.dealDamge(this);
                    } else if (grid1 instanceof Lightwall) {

                    } else if (grid1 instanceof TestPlayer) {
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
            console.log("Usagi is done");
        });

        // start the queue.
        this.triggerAction();

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
Usagi.prototype.attack = function() {
    this.gotoAndPlay("attack");
};

module.exports = Usagi;
