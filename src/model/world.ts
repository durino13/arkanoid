import { IGameObject } from './game_object';

export class World {

    protected _gameOver: false;

    protected _gameObjects: Array<IGameObject> = [];

    addObject(object: IGameObject) {
        this._gameObjects.push(object);
    }

    addObjects(objects: Array<IGameObject>) {
        this._gameObjects = this._gameObjects.concat(objects);
    }

    getObjects() {
        return this._gameObjects;
    }

    draw() {
        if (!this._gameOver) {
            this._gameObjects.forEach(function(object) {
                if (object.visible) {
                    object.draw();
                }
            })
        }
    }

}