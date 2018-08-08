import { IGameObject } from './game_object';
import { IObserver } from '../general/observer';
import { Collision } from './collision';
import { CollisionManager } from './collisionManager';
import { Ball } from './ball';
import { Wall } from './obstacle';

export class World implements IObserver {

    protected _gameOver: false;

    protected _collisionManager;

    protected _gameObjects: Array<IGameObject> = [];

    constructor(cm: CollisionManager) {
        this._collisionManager = cm;
        this._collisionManager.registerObserver(this);
    }

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

    onCollision(collision: Collision) {

        // Remove the object from the array of game objects when collision occures ..
        const index = this._gameObjects.indexOf(collision.collisionObject);
        if (index !== -1 && (!(this._gameObjects[index] instanceof Ball) && !(this._gameObjects[index] instanceof Wall))) {
            this._gameObjects.splice(index, 1);
        }
    }

}