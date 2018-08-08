import { IGameObject } from './game_object';
import { Position } from './position';
import { IObserver } from '../general/observer';
import { Collision } from './collision';
import { CollisionManager } from './collisionManager';
import { World } from './world';

export class Obstacle extends IGameObject implements IObserver {

    protected _ctx;

    protected _posStart;

    protected _posEnd;

    protected _collisionManager;

    constructor(ctx, collisionManager: CollisionManager, posStart: Position, posEnd: Position, color: string = 'red') {
        super();
        this._collisionManager = collisionManager;
        this._collisionManager.registerObserver(this);
        this._ctx = ctx;
        this._posStart = posStart;
        this._posEnd = posEnd;
        this._color = color;
    }

    draw() {
        // The obstacle is invisible
        this._ctx.fillStyle = this._color;
        this._ctx.fillRect(this._posStart.x, this._posStart.y, this.width(), this.height());
    }

    height() {
        return this._posEnd.y - this._posStart.y;
    }

    width() {
        return this._posEnd.x - this._posStart.x;
    }

    getTopLeftCornerPosition() {
        return new Position(this._posStart.x, this._posStart.y);
    }

    onCollision(collision: Collision) {
    //     let collidingObject = collision.collisionObject;
    //     if ((collidingObject === this) && !(collidingObject instanceof Wall)) {
    //         this.visible = false;
    //     }
    }

}

export class Wall extends Obstacle {
}

export class BottomWall extends Obstacle {

    protected _world;

    constructor(ctx, collisionManager: CollisionManager, posStart: Position, posEnd: Position, color: string = 'red', world: World) {
        super(ctx, collisionManager, posStart, posEnd, color);
        this._world = world;
    }

    onCollision(collision: Collision) {
        if (collision.collisionObject2 === this) {
            this._world.gameOver = true;
        }
    }

}