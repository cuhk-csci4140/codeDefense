var util = require('util');
var BoardObject = require('../../gameobjects/BoardObject');
var Mob = function(world) {
	Mob.super_.call(this, world);
        this.hpBar = new createjs.Shape();
        this.hpBar.graphics.beginFill("#ff0000").drawRect(0, 0, 100, 10);
};

util.inherits(Mob, BoardObject);

Mob.prototype.moveTo_ = function(h, v, equation, onCompleteEvent) {
    this.moveHPbar(h, v, equation);
    this.moveHonTai(h, v, equation, onCompleteEvent);
};

Mob.prototype.moveHonTai = function(h, v, equation, onCompleteEvent){
    var self = this;
    if (equation === undefined) {
        equation = createjs.Ease.linear;
    }
    h = h > this.boardWidth - 1 ? this.boardWidth - 1 : (h > 0 ? h : 0);
    v = v > this.boardHeight - 1 ? this.boardHeight - 1 : (v > 0 ? v : 0);

    var distance = Math.sqrt(Math.pow(this.position.horizontal - h, 2)
            + Math.pow(this.position.vertical - v, 2));

    this.onStartMoving_(event);
    var tween = createjs.Tween.get(this.sprite).to({
        x: 70 + (120 * h),
        y: 60 + (120 * v)
    }, (self.stats.movement * distance), equation).call(function(event) {
        self.position.vertical = v;
        self.position.horizontal = h;
        self.onStopMoving_(event);
        if (onCompleteEvent) {
            onCompleteEvent();
        }
    });    
}

Mob.prototype.moveHPbar = function(h, v, equation){
    var self = this;
    var distance = Math.sqrt(Math.pow(this.position.horizontal - h, 2)
            + Math.pow(this.position.vertical - v, 2));    
    var tween = createjs.Tween.get(this.hpBar).to({
        x: 93 + (120 * h),
        y: 10 + (120 * v)
    }, (self.stats.movement * distance), equation).call(function(event) {
        self.position.vertical = v;
        self.position.horizontal = h;
        self.onStopMoving_(event);
    });
};

Mob.prototype.getHPbar = function(){
    return this.hpBar;
};

// BoardObject.prototype.moveTo_ = function(h, v, equation, onCompleteEvent) {
module.exports = Mob;