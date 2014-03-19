var THREE = require('../vendor/Three');
var util = require('./Util');
var GameObjectManager = require('./GameObjectManager');
var World = require('./World');
var DefaultCamera = require('./cameras/DefaultCamera');
var Physijs = require('../vendor/Physi');

/**
 * Region (Abstract Class)
 * the class to define a particular scene
 */
var Region = function(opts) {
	this.opts = opts = World.extend({
		id : '__region' + Region.counter++
	}, opts);

	this.id = opts.id;
	// define the scene here
	// this.activated_ = true;
	// scene
	var scene;
	if (World.opts.physics || this.opts.physics) {
		scene = new Physijs.Scene();
		scene.setGravity(World.opts["physics.gravity"]);
		scene.addEventListener('update', function() {
			scene.simulate(undefined, 1);
		});
		console.log("[PHYSIJS] SCENE STARTED");
	} else {
		scene = new THREE.Scene();
	}

	this.scene = scene;
	this.spawnLocation = new THREE.Vector3(0, 0, 0);
	this.spawnRotation = new THREE.Vector3(0, 0, 0);

	/*
	 * set the camera as DefaultCamera
	 */
	this.camera = new DefaultCamera(75, World.opts.width / World.opts.height,
			0.2, 800);
	
	//enable support of Browser Window Resize
	if (World.opts.resize) {
		window.addEventListener('resize', util.callback(this, function() {
			this.camera.aspect = window.innerWidth / window.innerHeight;
			this.camera.updateProjectionMatrix();
		}), false);
	}

	// add lights
	var light = new THREE.DirectionalLight(0xFFFFFF);
	light.position.set(40, 40, 25);
	light.target.position.copy(scene.position);
	light.castShadow = true;
	light.shadowCameraLeft = -25;
	light.shadowCameraTop = -25;
	light.shadowCameraRight = 25;
	light.shadowCameraBottom = 25;
	light.shadowBias = -.0001
	scene.add(light);
	this.camera.lookAt(scene.position);

	
	//region objects are immobile objects and collision detection should be applied , otherwise gameobjectss
	this.regionobjects = new GameObjectManager();
	this.gameobjects = new GameObjectManager();
	this.gameobjects.add('camera', this.camera);
	// this.terrain;
	// this.scripts;
	// this.lights;
};

Region.prototype.render = function(dt) {
	this.regionobjects.render(dt);
	this.gameobjects.render(dt);

	return this;
};

/*
 * Region.prototype.toField = function(){ return new Field( this ); }
 */
Region.counter = 0;

module.exports = Region;