var util = require('util');
var Castable = require('./Castable');

var ShootingSpell = function(world) {
    console.log("Initialize a shooting spell");
    ShootingSpell.super_.call(this, world);
    //this.calTarget();
};

util.inherits(ShootingSpell, Castable);

ShootingSpell.prototype.execute = function(caster, onComplete) {
    this.calTarget(caster);

    //if doesn't return a function , skill execution is independent of caster turn.
    return this.shoot(caster, onComplete);
};

ShootingSpell.prototype.shoot = function(caster, onComplete) {
    //override this one, and the real stuff put here
};

ShootingSpell.prototype.calTarget = function(caster) {
    console.log(this.name + " calculating target");
    var gameBoard = this.world.activeLevel.gameboard;

    // get back the gameBoard
    // Fireball is horizontal shooting
    // get the first hit target in same horizontal
    //console.log("veritcal and horizontal: "+this.position.vertical+", "+ this.position.horizontal);
    var vertical = this.position.vertical;
    var horizontal;
    var target;
    for (horizontal = (this.position.horizontal + 1); horizontal < 12; horizontal++) {
        target = gameBoard[horizontal][vertical];
        if (target !== null) {
            this.target.push(target);
            this.targetX = horizontal;
            this.targetY = vertical;
            if (this.aoe == true) {
                // AOE!
                var i, j, targetNow;
                for (i = 1; i <= this.range; i++) {
                    for (j = 1; j <= this.range; j++) {
                        targetNow = gameBoard[horizontal + i][vertical + j];
                        if ((targetNow !== null) && (typeof(targetNow) !== "undefined")) {
                            this.target.push(targetNow);
                        }
                        targetNow = gameBoard[horizontal - i][vertical - j];
                        if ((targetNow !== null) && (typeof(targetNow) !== "undefined")) {
                            this.target.push(targetNow);
                        }
                    }
                }

            }
            break;
        }
        this.targetX = 13;
        this.targetY = vertical;
        this.target = [];
        //this.target = gameBoard[horizontal][vertical];
    }
};

module.exports = ShootingSpell;

