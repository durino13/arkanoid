import { Position } from './position';
import { Collision } from './collision';
import { IGameObject } from './game_object';
import { World } from './world';
import { CollisionManager } from './collisionManager';
import { IObserver } from '../general/observer';

export class Ball extends IGameObject implements IObserver{

    public static readonly _radius = 10;

    protected _ctx;

    protected _speed;

    protected _posStart;

    protected _angle;

    protected _color;

    protected _collisionManager;

    protected _world;

    constructor(ctx, collisionManager: CollisionManager, position: Position, world: World) {
        super();
        this._collisionManager = collisionManager;
        this._collisionManager.registerObserver(this);
        this._ctx = ctx;
        this._posStart = position;
        this._color = 'blue';
        this._speed = 5;
        this._angle = 120;
        this._world = world;
    }

    draw() {
        this._ctx.beginPath();
        this._ctx.arc(this._posStart.x, this._posStart.y, Ball._radius, 0, 90);
        this._ctx.fillStyle = this._color;
        this._ctx.fill();
        this.move();
    }

    /**
     * @param angle
     * @param side
     */
    calculateAngle(angle, side) {

        console.log(side);
        console.log('Lopta dopadla pod uhlom: ' + angle);

        // Side top

        if (side === Collision.SIDE_TOP && (angle >= 270) && (angle < 360)) {
            return 0 + (360 - angle);
        }

        if (side === Collision.SIDE_TOP && (angle >= 180) && (angle < 270)) {
            return 90 + (270 - angle);
        }

        // Side bottom

        if (side === Collision.SIDE_BOTTOM && (angle >= 90) && (angle < 180)) {
            return 180 + (180 - angle);
        }

        if (side === Collision.SIDE_BOTTOM && (angle >= 0) && (angle < 90)) {
            return 360 - angle;
        }

        // Side left

        if (side === Collision.SIDE_LEFT && (angle >= 0) && (angle < 90)) {
            return 180 - angle;
        }

        if (side === Collision.SIDE_LEFT && (angle >= 270) && (angle < 360)) {
            return 180 + (360 - angle)
        }

        // Side right

        if (side === Collision.SIDE_RIGHT && (angle >= 90) && (angle < 180)) {
            return 0 + (180 - angle);
        }

        if (side === Collision.SIDE_RIGHT && (angle >= 180) && (angle < 270)) {
            return 270 + (270 - angle)
        }

    }

    getTopLeftCornerPosition() {
        return new Position(this._posStart.x - Ball._radius, this._posStart.y - Ball._radius);
    }

    move() {

        this._world.getObjects().forEach(gameObject => {

            if(!(gameObject instanceof Ball)) {
                let collision = this._collisionManager.determineCollision(this, gameObject);
                if (collision !== false) {
                    this._collisionManager.notifyObservers(collision);
                    this._collisionManager.lastCollisionSide = collision.collisionSide;
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
        return new Position(startPosition.x + xunits, startPosition.y + yunits);
    }

    height() {
        return Ball._radius * 2;
    }

    width() {
        return Ball._radius * 2;
    }

    onCollision(collision: Collision) {
        this._angle = this.calculateAngle(this._angle, collision.collisionSide);
        console.log('Ball new angle: ' + this._angle);
    }

}

