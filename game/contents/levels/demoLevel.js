var Mage = require('../../gameobjects/TestPlayer');

var demoLevel = function(world) {
	this.initialized = false;
	var playerObj = new Mage(world);
	world.gameobjects.push(playerObj);
	var player = playerObj.getSprite();
	player.setTransform(70,60,0.6,0.6);
	
	var ground = new createjs.Shape();
	ground.graphics.beginBitmapFill(world.assets.getResult("board"),
			"no-repeat").drawRect(0, 0, 1440, 727);
//	ground.cache(0, 0, 1440, 727, 1 / world.ratio);
	
	
	world.stage.addChild(ground, player);
};

demoLevel.prototype.initialize = function() {

	this.initialized = true;
};

demoLevel.prototype.update = function(event) {
	if (this.initialized) {

	}
};
demoLevel.prototype.dispose = function() {

};

module.exports = demoLevel;