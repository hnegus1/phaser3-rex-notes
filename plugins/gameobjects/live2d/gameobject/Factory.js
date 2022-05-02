import Live2dGameObject from './Live2dGameObject.js';

export default function (x, y, key) {
    var gameObject = new Live2dGameObject(this.scene, x, y, key);
    this.scene.add.existing(gameObject);
    return gameObject;
};