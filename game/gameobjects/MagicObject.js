var util = require('util');
var BoardObject = require('./BoardObject');

var Fireball = function(world){
	Fireball.super_.call(this);
	this.setSpriteSheet(new createjs.SpriteSheet({
		"images" : [ world.assets.getResult("fireball") ],
		"frames" : {
			"regX": 63, 
			"height": 128, 
			"count": 28,
			"regY": 63, 
			"width": 128
		},
		"animations" : {
			"initial": [0,6,"travel",2],
			"travel": [7,17,"travel"],
			"explode": [18, 28]
		}
	}));
	this.defaultAnimation = "initial";
	console.log("Fireball initialized");
	this.initialize();
}