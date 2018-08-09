import { Position } from './position';
import { IGameObject } from './game_object';
import { IObserver } from '../general/observer';
import { Collision } from './collision';
import { CollisionManager } from './collisionManager';
import { Ball } from './ball';
import { Sprite } from '../general/sprite';

let ARROW_MAP = {
    37: 'left',
    40: 'up',
    39: 'right',
    38: 'down'
};

export class Player extends IGameObject implements IObserver {

    public static readonly _width = 80;

    public static readonly _height = 15;

    protected _ctx;

    protected _speed: number;

    protected _collisionManager: CollisionManager;

    constructor(ctx, cm: CollisionManager, position: Position) {
        super();
        this._ctx = ctx;
        this._position = position;
        this._color = 'orange';
        this._speed = 15;
        this._collisionManager = cm;
        this._collisionManager.registerObserver(this);
        document.addEventListener('keydown', this.move.bind(this));
    }

    draw() {
        this._ctx.fillStyle = this._color;
        let sprite = new Sprite(this._ctx, '', new Position(0,0), 10, 0, 0, 0, true);
        sprite.render();
        // this._ctx.fillRect(this._position.x, this._position.y, Player._width, Player._height);
    }

    move(e) {

        let arrow = ARROW_MAP[e.keyCode];

        if (arrow === 'left') {
            this._position.x -= this._speed;
        }
        if (arrow === 'right') {
            this._position.x += this._speed;
        }

    }

    height() {
        return Player._height;
    }

    width() {
        return Player._width;
    }

    getTopLeftCornerPosition() {
        return new Position(this._position.x, this._position.y);
    }

    calculateAngleAdjustment(ball: Ball) {

        let ballVsPayerCollisionPointX = ball.getTopLeftCornerPosition().x - this.getTopLeftCornerPosition().x;

        if ((ball.angle > 180 && ball.angle < 270) && (ballVsPayerCollisionPointX > Player._width / 2)) {
            console.log('Adjusting ball angle backwards');
            return -20;
        }

        if ((ball.angle > 270 && ball.angle < 360) && (ballVsPayerCollisionPointX < Player._width / 2)) {
            console.log('Adjusting ball angle backwards');
            return 20;
        }

        return 0;
    }

    /*
    |--------------------------------------------------------------------------
    | Collision event
    |--------------------------------------------------------------------------
    | 
    |
    */
    
    onCollision(collision: Collision) {

        if (collision.collisionObject2 === this) {
            let ball = collision.collisionObject1;
            ball.angleAdjustment = this.calculateAngleAdjustment(collision.collisionObject1);
        }

    }

}