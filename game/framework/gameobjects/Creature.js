/**
 * an gameobject to create creature
 * @constructor
 * @this {Creature}
 * @param {geometry, material} 
 */
var THREE = require('../../vendor/Three');
var util = require('util');
var GameObject = require('./GameObject');

Creature = function(geometry, material) {
    Creature.super_.call(this, geometry, material);
    this.hp = 0;
    this.maxHp = 0;
    this.state = Creature.States.ALIVE;
    
};
util.inherits(Creature, GameObject);

/**
 * Creature spawn
 * @param {position} 
 * @exception
 */
Creature.prototype.spawn(position){
    if(! position instanceof THREE.Vector3){
	throw Error("Position must be instance of THREE.Vector3");
    }
}

/**
 * Creature's status
 */
Creature.States = {
    ALIVE : 'Alive',
    DEAD : 'Dead'
};
