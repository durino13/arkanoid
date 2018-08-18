import { IGameObject } from './game_object';
import { IObserver } from '../lib/observer';
import { Collision } from './collision';
import { CollisionManager } from './collisionManager';
import { Ball } from './ball';
import { Stone, Wall } from './obstacle';
import { Player } from './player';

export class World implements IObserver {

    protected _ctx;

    protected _gameOver: boolean;

    protected _collisionManager;

    protected _gameObjects: Array<IGameObject> = [];

    constructor(ctx, cm: CollisionManager) {
        this._ctx = ctx;
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
            this._gameObjects.forEach(object => object.draw())
        } else {
            let gameOver = new Image();
            gameOver.src = 'resources/game_over.png';
            this._ctx.drawImage(gameOver, 100, 100)

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
            && !(this._gameObjects[indexOfObjectFound] instanceof Wall)
            && !(this._gameObjects[indexOfObjectFound] instanceof Player)
                && !(this._gameObjects[indexOfObjectFound] instanceof Stone));
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