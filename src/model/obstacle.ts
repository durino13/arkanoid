import { IGameObject } from './game_object';
import { Position } from './position';
import { IObserver } from '../lib/observer';
import { Collision } from './collision';
import { CollisionManager } from './collisionManager';
import { World } from './world';
import { Sprite } from '../lib/sprite';

export abstract class Obstacle extends IGameObject implements IObserver {

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

    getTopLeftCornerPosition() {
        return new Position(this._posStart.x, this._posStart.y);
    }

    onCollision(collision: Collision) {
        // No implementation ..
    }

    abstract draw();

}

export class Wall extends Obstacle {
    draw(){}
}

export class Brick extends Obstacle {
    draw() {
        // The obstacle is invisible
        let sprite = new Sprite(this._ctx, 'resources/brick.png', new Position(this._posStart.x,this._posStart.y), new Position(80, 27), new Position(0,0));
        sprite.render();
    }
}

export class Stone extends Obstacle {
    draw() {
        // The obstacle is invisible
        let sprite = new Sprite(this._ctx, 'resources/stone.png', new Position(this._posStart.x,this._posStart.y), new Position(80, 27), new Position(0,0));
        sprite.render();
    }
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

    draw() {}

}