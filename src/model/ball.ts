import { Position } from './position';
import { Player } from './player';
import { CollisionDetector } from './collision_detector';
import { IGameObject } from './game_object';
import { World } from './world';

export class Ball extends IGameObject {

    public static readonly _radius = 10;

    protected _ctx;

    protected _speed;

    protected _position;

    protected _direction;

    protected _color;

    protected _world;

    constructor(ctx, position: Position, world: World) {
        super();
        this._ctx = ctx;
        this._position = position;
        this._color = 'blue';
        this._speed = 1;
        this._direction = 'go_up';
        this._world = world;
    }

    draw() {
        this.move();
        this._ctx.beginPath();
        this._ctx.arc(this._position.x, this._position.y, Ball._radius, 0, 2*Math.PI, false);
        this._ctx.fillStyle = this._color;
        this._ctx.fill();
    }

    move() {

        if (this._position.y > Ball._radius && this._direction === 'go_up') {
            this._position.y -= this._speed;
        } else {

            this._direction = 'go_down';
            this._position.y += this._speed;

            this._world.getObjects().forEach(function(gameObject) {
                console.log(gameObject);
                if (!(gameObject instanceof Ball)) {
                    if (CollisionDetector.isColision(this, gameObject)) {
                        console.log(gameObject.constructor.name);
                    }
                }

            });
        }
    }

    height() {
        return Ball._radius;
    }

    width() {
        return Ball._radius;
    }

}