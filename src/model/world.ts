import { IGameObject } from './game_object';
import { IObserver } from '../lib/observer';
import { Collision } from './collision';
import { CollisionManager } from './collisionManager';
import { Ball } from './ball';
import { Stone, Wall, Brick } from './obstacle';
import { Player } from './player';
import { ArkanoidGame } from '../arkanoid';
import { Event } from '../lib/eventEmitter';

export class World implements IObserver {

    protected _ctx;

    protected _gameContext: ArkanoidGame;

    protected _gameOver: boolean;

    protected _paused: boolean;

    protected _collisionManager;

    protected _gameObjects: Array<IGameObject> = [];

    constructor(ctx, gc: ArkanoidGame, cm: CollisionManager) {
        this._ctx = ctx;
        this._gameContext = gc;
        this._collisionManager = cm;
        this._gameOver = false;
        this._paused = false;
        // TODO Make event emitter global, so I don't have to get it through gameContext ..
        this._gameContext.eventEmitter.registerObserver(this);
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

    levelCompleted() {
        let allBricksDestroyed = true;
        this._gameObjects.forEach((object) => {
            if (object instanceof Brick) {
                allBricksDestroyed = false;
            }
        });
        return allBricksDestroyed;
    }

    draw() {

        if (!this._gameOver && !this._paused) {
            if (this.levelCompleted()) {
                this._paused = true;
            } else {
                this._gameObjects.forEach(object => object.draw())
            }
        } else {

            // Game over
            if (this._gameOver) {
                this.renderGameOverImage();
            }

            // Game paused
            if (this._paused) {
                this.renderNextLevelImage();
            }


        }
    }

    private renderGameOverImage() {
        let gameOver = new Image();
        gameOver.src = 'resources/game_over.png';
        this._ctx.drawImage(gameOver, 80, 300)
    }

    private renderNextLevelImage() {
        let nextLevel = new Image();
        nextLevel.src = 'resources/next_level.png';
        this._ctx.drawImage(nextLevel, 150, 200)
    }

    onEvent(event: Event, collision: Collision) {

        if (event.name === Event.EVENT_ON_COLLISION) {
            // Remove the object from the array of game objects when collision occures ..
            const indexOfObjectFound = this._gameObjects.indexOf(collision.collisionObject2);

            if (indexOfObjectFound !== -1 && this.isProtected(indexOfObjectFound) && !this.gameOver) {
                this._gameObjects.splice(indexOfObjectFound, 1);
            }
        }

    }

    /**
     * Do not remove following objects from the world
     * @param indexOfObjectFound
     */
    // TODO Implement object property
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

    set paused(paused: boolean) {
        this._paused = paused;
    }

    get isPaused() {
        return this._paused;
    }

}