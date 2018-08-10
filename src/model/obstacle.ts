import { IGameObject } from './game_object';
import { Position } from './position';
import { IObserver } from '../general/observer';
import { Collision } from './collision';
import { CollisionManager } from './collisionManager';
import { World } from './world';
import { Sprite } from '../general/sprite';

export class Obstacle extends IGameObject implements IObserver {

    public static readonly _spriteX = 0;

    public static readonly _spriteY = 0;

    protected _ctx;

    protected _posStart;

    protected _posEnd;

    protected _collisionManager;

    constructor(ctx, collisionManager: CollisionManager, posStart: Position, posEnd: Position, color: string = 'blue') {
        super();
        this._collisionManager = collisionManager;
        this._collisionManager.registerObserver(this);
        this._ctx = ctx;
        this._posStart = posStart;
        this._posEnd = posEnd;
        this._color = color;
        this._height = this._posEnd.y - this._posStart.y;
        this._width = this._posEnd.x - this._posStart.x;
    }

    draw() {
        // The obstacle is invisible
        this._ctx.fillStyle = this._color;
        this._ctx.fillRect(this._posStart.x, this._posStart.y, this.width, this.height);
    }

    getTopLeftCornerPosition() {
        return new Position(this._posStart.x, this._posStart.y);
    }

    onCollision(collision: Collision) {
        // No implementation ..
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