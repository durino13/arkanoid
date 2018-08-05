import { Position } from './position';
import { Collision } from './collision';
import { IGameObject } from './game_object';
import { World } from './world';

export class Ball extends IGameObject {

    public static readonly _radius = 10;

    protected _ctx;

    protected _speed;

    protected _posStart;

    protected _angle;

    protected _color;

    protected _world;

    constructor(ctx, position: Position, world: World) {
        super();
        this._ctx = ctx;
        this._posStart = position;
        this._color = 'blue';
        this._speed = 1;
        this._angle = 130;
        this._world = world;
    }

    draw() {
        this._ctx.beginPath();
        this._ctx.arc(this._posStart.x, this._posStart.y, Ball._radius, 0, 90);
        this._ctx.fillStyle = this._color;
        this._ctx.fill();
        this.move();
    }

    calculateAngle(angle, side) {

        console.log(side);
        console.log('Lopta dopadla pod uhlom: ' + angle);

        // Side top

        if (side === Collision.SIDE_TOP && (angle >= 90) && (angle < 180)) {
            return (angle + 90);
        }

        if (side === Collision.SIDE_TOP && (angle >= 180) && (angle < 270)) {
            return (angle - 90);
        }

        if (side === Collision.SIDE_TOP && (angle >= 270) && (angle < 360)) {
            return 180 - (angle - 180);
        }

        // Side bottom

        if (side === Collision.SIDE_BOTTOM && (angle >= 0) && (angle < 90)) {
            return (360 - angle);
        }

        if (side === Collision.SIDE_BOTTOM && (angle >= 90) && (angle < 180)) {
            return 180 + (180 - angle);
        }

        // Side left

        if (side === Collision.SIDE_LEFT && (angle >= 0) && (angle < 90)) {
            return (angle + 90);
        }

        if (side === Collision.SIDE_LEFT && (angle >= 270) && (angle < 360)) {
            return (angle - 90);
        }

        // Side right

        if (side === Collision.SIDE_RIGHT && (angle >= 90) && (angle < 180)) {
            return (angle - 90);
        }

        if (side === Collision.SIDE_RIGHT && (angle >= 180) && (angle < 270)) {
            return (angle + 90);
        }

    }

    getTopLeftCornerPosition() {
        return new Position(this._posStart.x - Ball._radius, this._posStart.y - Ball._radius);
    }

    move() {

        let collision;
        this._world.getObjects().forEach(gameObject => {

            if(!(gameObject instanceof Ball)) {
                collision = Collision.isCollision(this, gameObject);
                if(collision !== false) {
                    this._angle = this.calculateAngle(this._angle, collision.getColisionSide());
                    console.log('Lopta sa odrazila pod uhlom: ' + this._angle);
                }
            }

        });

        let nextPosition: Position = Position.getNextPosition(this._speed, this._angle, this._posStart);
        this._posStart = nextPosition;

    }

    hit() {
        // Void
    }

    height() {
        return Ball._radius * 2;
    }

    width() {
        return Ball._radius * 2;
    }

}

