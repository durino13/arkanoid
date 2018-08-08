import { IGameObject } from './game_object';
import { IObserver } from '../general/observer';
import { Collision } from './collision';
import { CollisionManager } from './collisionManager';
import { Ball } from './ball';
import { Wall } from './obstacle';
import { Player } from './player';

export class World implements IObserver {

    protected _gameOver: boolean;

    protected _collisionManager;

    protected _gameObjects: Array<IGameObject> = [];

    constructor(cm: CollisionManager) {
        this._collisionManager = cm;
        this._collisionManager.registerObserver(this);
        this._gameOver = false;
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
        const indexOfObjectFound = this._gameObjects.indexOf(collision.collisionObject2);

        if (indexOfObjectFound !== -1 && this.isProtected(indexOfObjectFound) && !this.gameOver) {
            this._gameObjects.splice(indexOfObjectFound, 1);
        }
    }

    /**
     * Do not remove following objects from the world
     * @param indexOfObjectFound
     */
    protected isProtected(indexOfObjectFound: number) {
        return (!(this._gameObjects[indexOfObjectFound] instanceof Ball)
            && !(this._gameObjects[indexOfObjectFound] instanceof Wall))
            && !(this._gameObjects[indexOfObjectFound] instanceof Player);
    }

    /**
     * Is the game finished?
     */
    set gameOver(gameOver: boolean) {
        this._gameOver = gameOver;
    }

    get gameOver() {
        return this._gameOver;
    }

}