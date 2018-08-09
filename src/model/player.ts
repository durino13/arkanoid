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

    public static readonly _width = 97;

    public static readonly _height = 25;

    public static readonly _spriteX = 184;

    public static readonly _spriteY = 111;

    public static readonly _speed = 15;

    protected _ctx;

    protected _speed: number;

    protected _collisionManager: CollisionManager;

    constructor(ctx, cm: CollisionManager, position: Position) {
        super();
        this._ctx = ctx;
        this._posStart = position;
        this._color = 'orange';
        this._speed = Player._speed;
        this._height = Player._height;
        this._width = Player._width;
        this._collisionManager = cm;
        this._collisionManager.registerObserver(this);
        document.addEventListener('keydown', this.move.bind(this));
    }

    draw() {
        let sprite = new Sprite(this._ctx, '../resources/arkanoid_sprite.png', this._posStart, new Position(this._width, this._height), new Position(Player._spriteX, Player._spriteY));
        sprite.render();
    }

    move(e) {

        let arrow = ARROW_MAP[e.keyCode];

        if (arrow === 'left') {
            this._posStart.x -= this._speed;
        }
        if (arrow === 'right') {
            this._posStart.x += this._speed;
        }

    }

    getTopLeftCornerPosition() {
        return new Position(this._posStart.x, this._posStart.y);
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
    */
    
    onCollision(collision: Collision) {

        if (collision.collisionObject2 === this) {
            let ball = collision.collisionObject1;
            ball.angleAdjustment = this.calculateAngleAdjustment(collision.collisionObject1);
        }

    }

}