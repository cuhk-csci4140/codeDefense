var util = require('util');
var Castable = require('../../gameobjects/Castable');
var ScriptService = require('../services/ScriptService');

var Teleport = function(world, args) {
    Teleport.super_.call(this, world);
    this.name = "Teleport";
    this.castTime = 0.5;
    console.log("Teleport initialized");
    this.args = args;
    this.cost = 6;
    this.initialize();

}
util.inherits(Teleport, Castable);

Teleport.exposeMethods = [];

Teleport.prototype.execute = function(caster, onComplete) {

    return (function() {
        if (this.args.length >= 2) {
            var x = parseInt(this.args[0]);
            var y = parseInt(this.args[1]);

            if (x >= 0 && x < this.boardWidth && y >= 0 && y < this.boardHeight
                    && this.world.activeLevel.gameboard[x][y] == null) {
                caster.setPosition(x, y);
                if (this.args.length >= 3) {
                    if (!caster.isCastable(this.args[2])
                            && this.args[2] instanceof Function) {
                        this.args[2] = this.args[2]();
                    }

                    if (caster.isCastable(this.args[2])) {
                        caster.cast_(this.args[2], onComplete);
                        return;
                    }
                }


            } else {
                showBox("Teleport", "Teleporting to a invalid position.");
                console.log("Teleporting to a invalid position.");
            }
        }
        onComplete();
    }).bind(this);

};

module.exports = Teleport;