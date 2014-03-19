/**
 * @deprecated
 * Scene Manager
 */
var THREE = require('../vendor/Three');
var util = require('./Util');

var SceneManager = function(opts) {
    this.activeScene = "main";
    this.scenes = {};
    this.active = {
	"scene" : null,
	"cameras" : null
    };

};

/**
 * Scene Manager add
 * @param name, scene, cameras
 * @this {SceneManager}
 */
SceneManager.prototype.add = function(name, scene, cameras) {
    this.scenes[name] = {
	"scene" : scene,
	"cameras" : cameras
    };
};
/**
 * Scene Manager add
 * @param name
 * @this {SceneManager}
 * @return {array} this.scenes[name]
 */
SceneManager.prototype.get = function(name) {
    return this.scenes[name];
};
/**
 * Activate SceneManager
 * @param name
 * @this {SceneManager}
 * @return {bool} this.active
 */
SceneManager.prototype.setActive = function(name) {
    this.activeScene = name;
    this.active = this.scenes[name];
    return this.active;

};
/**
 * Scene Manager render
 * @this {SceneManager}
 * @return {SceneManager} this
 */
SceneManager.prototype.render = function() {
    return this;
};
/**
 * Scene Manager boilerplate
 * @this {SceneManager}
 */
SceneManager.prototype.boilerplate = function() {
    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(75, window.innerWidth
	    / window.innerHeight, 0.1, 10000);
    camera.position.x = 0;
    camera.position.y = 6;
    camera.position.z = 10;
    camera.rotation = new THREE.Vector3(-1, 0, 1);
    scene.add(camera);

    // add lights
    // Light
    light = new THREE.DirectionalLight(0xFFFFFF);
    light.position.set(40, 40, 25);
    light.target.position.copy(scene.position);
    light.castShadow = true;
    light.shadowCameraLeft = -25;
    light.shadowCameraTop = -25;
    light.shadowCameraRight = 25;
    light.shadowCameraBottom = 25;
    light.shadowBias = -.0001
    scene.add(light);

    camera.lookAt(scene.position);
    this.add("main", scene, {
	"main" : camera
    }); // define scene and cameras
    this.setActive("main");
};

module.exports = SceneManager;