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
        this._angle = 100;
        this._world = world;
    }

    draw() {
        this._ctx.beginPath();
        this._ctx.arc(this._posStart.x, this._posStart.y, Ball._radius, 0, 90);
        this._ctx.fillStyle = this._color;
        this._ctx.fill();
        this.move();
    }

    calculateAngle(angle) {

        // 2. quadrant

        if ((angle > 90) && (angle < 180)) {
            return 180 + (180 - angle);
        }

        // 3. quadrant

        if ((angle > 180) && (angle < 270)) {
            return 180 - (angle - 180);
        }

    }

    getTopLeftCornerPosition() {
        return new Position(this._posStart.x - Ball._radius, this._posStart.y - Ball._radius);
    }

    move() {

        this._world.getObjects().forEach(gameObject => {

            if(!(gameObject instanceof Ball)) {
                if(Collision.isColision(this, gameObject) !== false) {
                    this._angle = this.calculateAngle(this._angle);
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

