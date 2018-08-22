import { Position } from './position';
import { Collision } from './collision';
import { IGameObject } from './game_object';
import { World } from './world';
import { CollisionManager } from './collisionManager';
import { Sprite } from '../lib/sprite';
import { ArkanoidGame } from '../arkanoid';
import { Event } from '../lib/eventEmitter';

export class Ball extends IGameObject {

    protected static readonly _spriteX = 32;

    protected static readonly _spriteY = 79;

    protected static readonly _speed = 8;

    protected static _angle = 100;

    public static readonly _radius = 12.5;

    protected _ctx;

    protected _gameContext;

    protected _speed;

    protected _posStart;

    protected _angle;

    protected _color;

    protected _collisionManager;

    protected _world;

    protected _angleAdjustment;

    constructor(ctx, gc: ArkanoidGame, collisionManager: CollisionManager, position: Position, world: World) {
        super();
        this._gameContext = gc;
        this._collisionManager = collisionManager;
        this._gameContext._eventEmitter.registerObserver(this);
        this._ctx = ctx;
        this._posStart = position;
        this._color = 'blue';
        this._speed = Ball._speed;
        this._angle = Ball._angle;
        this._width = Ball._radius * 2;
        this._height = Ball._radius * 2;
        this._world = world;
        this._angleAdjustment = 0;
    }

    set angleAdjustment(angleAdjustment: number) {
        this._angleAdjustment = angleAdjustment;
    }

    get angleAdjustment(): number {
        return this._angleAdjustment;
    }

    get angle() {
        return this._angle;
    }

    draw() {
        let sprite = new Sprite(this._ctx, '../resources/ball.png',
            new Position(this._posStart.x - Ball._radius, this._posStart.y - Ball._radius),
            new Position(this._width, this._height),
            new Position(0, 0));
        sprite.render();
        this.move();
    }

    /**
     * @param angle
     * @param side
     */
    calculateAngle(angle, side) {

        let outputAngle = 0;

        // Side top

        if (side === Collision.SIDE_TOP && (angle >= 270) && (angle < 360)) {
            outputAngle = 360 - angle;
        }

        if (side === Collision.SIDE_TOP && (angle >= 180) && (angle < 270)) {
            outputAngle = 90 + (270 - angle);
        }

        // Side bottom

        if (side === Collision.SIDE_BOTTOM && (angle >= 90) && (angle < 180)) {
            outputAngle = 180 + (180 - angle);
        }

        if (side === Collision.SIDE_BOTTOM && (angle >= 0) && (angle < 90)) {
            outputAngle = 360 - angle;
        }

        // Side left

        if (side === Collision.SIDE_LEFT && (angle >= 0) && (angle < 90)) {
            outputAngle = 180 - angle;
        }

        if (side === Collision.SIDE_LEFT && (angle >= 270) && (angle < 360)) {
            outputAngle = 180 + (360 - angle)
        }

        // Side right

        if (side === Collision.SIDE_RIGHT && (angle >= 90) && (angle < 180)) {
            outputAngle = 0 + (180 - angle);
        }

        if (side === Collision.SIDE_RIGHT && (angle >= 180) && (angle < 270)) {
            outputAngle = 270 + (270 - angle)
        }

        return outputAngle + this._angleAdjustment;

    }

    getTopLeftCornerPosition() {
        return new Position(this._posStart.x - Ball._radius, this._posStart.y - Ball._radius);
    }

    move() {

        this._world.getObjects().forEach(gameObject => {

            if(!(gameObject instanceof Ball)) {
                let collision = this._collisionManager.determineCollision(this, gameObject);
                if (collision !== false) {
                    this._gameContext.eventEmitter.emit(new Event(Event.EVENT_ON_COLLISION), collision);
                }
            }

        });

        let nextPosition: Position = this.getNextPosition(this._speed, this._angle, this._posStart);
        this._posStart = nextPosition;

    }

    public getNextPosition(speed: number, angle: number, startPosition: Position): Position {
        let radians = angle * Math.PI/ 180;
        let xunits = Math.cos(radians) * speed;
        let yunits = - Math.sin(radians) * speed;
        this.resetAngleAdnustment();
        return new Position(startPosition.x + xunits, startPosition.y + yunits);
    }

    resetAngleAdnustment() {
        this._angleAdjustment = 0;
    }
    
    /*
    |--------------------------------------------------------------------------
    | On collision event
    |--------------------------------------------------------------------------
    | 
    |
    */

    onEvent(event: Event, collision: Collision) {
        if (event.name === Event.EVENT_ON_COLLISION) {
            this._angle = this.calculateAngle(this._angle, collision.collisionSide);
            // console.log('Ball hit: ' + collision.collisionSide)
            // console.log('New angle after collision: ' + this._angle)
            // console.log('Angle adjusted by: ' + this._angleAdjustment);
        }
    }

}

